import { Mail, Phone, Trash2, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '../services/supabaseClient';
import { Inquiry } from '../types';
import { formatCurrency } from '../lib/utils';

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<(Inquiry & { properties?: { title: string } | null })[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select(`
          *,
          properties (
            title
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setInquiries(data || []);
    } catch (error: any) {
      toast.error('Erro ao buscar mensagens: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteInquiry = async (id: string) => {
    console.log('Iniciando exclusão da mensagem:', id);
    
    try {
      const { data, error, status } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', id)
        .select();

      if (error) throw error;
      
      if (!data || data.length === 0) {
        toast.error('O Supabase bloqueou a exclusão (RLS). Verifique o SQL.');
        return;
      }

      toast.success('Mensagem removida com sucesso.');
      setDeletingId(null);
      await fetchInquiries();
    } catch (error: any) {
      console.error('Erro técnico na exclusão:', error);
      toast.error('Erro ao excluir no banco de dados.');
    }
  };

  useEffect(() => {
    fetchInquiries();
  }, []);

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4">
        <div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin" />
        <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Lendo mensagens...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {inquiries.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
          <p className="text-lg text-gray-500">Nenhuma mensagem recebida ainda.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {inquiries.map((inquiry) => (
            <div 
              key={inquiry.id} 
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl border-2 border-slate-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="space-y-3 flex-1">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-brand-gold/10 rounded-xl">
                      <User className="w-5 h-5 text-brand-gold" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg text-slate-900 dark:text-white">{inquiry.name}</h4>
                      <p className="text-xs text-slate-500 font-medium">
                        {inquiry.created_at ? new Date(inquiry.created_at).toLocaleString('pt-BR') : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-slate-600 dark:text-gray-400">
                    <a href={`mailto:${inquiry.email}`} className="flex items-center gap-2 hover:text-brand-gold transition-colors font-medium">
                      <Mail className="w-4 h-4" />
                      {inquiry.email}
                    </a>
                    <a href={`tel:${inquiry.phone}`} className="flex items-center gap-2 hover:text-brand-gold transition-colors font-medium">
                      <Phone className="w-4 h-4" />
                      {inquiry.phone}
                    </a>
                  </div>

                  <div className="bg-slate-50 dark:bg-gray-800/50 p-5 rounded-2xl border border-slate-200 dark:border-gray-800 mt-2 shadow-inner">
                    <p className="text-sm italic text-slate-700 dark:text-gray-300">"{inquiry.message}"</p>
                  </div>
                </div>

                <div className="flex flex-col justify-between items-end gap-6 min-w-[200px]">
                  {inquiry.properties && (
                    <div className="text-right bg-brand-gold/10 dark:bg-brand-gold/5 p-3 rounded-xl border border-brand-gold/20 dark:border-brand-gold/10">
                      <span className="text-[10px] font-bold uppercase text-brand-gold tracking-widest block mb-1">Interesse em:</span>
                      <p className="text-sm font-bold text-slate-900 dark:text-white">
                        {inquiry.properties.title}
                      </p>
                    </div>
                  )}
                  
                  {deletingId === inquiry.id ? (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setDeletingId(null)}
                        className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded-xl font-bold text-[10px] uppercase tracking-wider hover:bg-gray-200 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        onClick={() => deleteInquiry(inquiry.id)}
                        className="px-4 py-2 bg-red-500 text-white rounded-xl font-bold text-[10px] uppercase tracking-wider hover:bg-red-600 shadow-md shadow-red-500/10 transition-colors"
                      >
                        Excluir
                      </button>
                    </div>
                  ) : (
                    <button
                      type="button"
                      onClick={() => setDeletingId(inquiry.id)}
                      className="flex items-center gap-2 px-4 py-2 text-gray-400 dark:text-gray-500 hover:text-red-500 transition-all font-bold text-[10px] uppercase tracking-widest group"
                    >
                      <Trash2 className="w-4 h-4 opacity-50 group-hover:opacity-100" />
                      <span>Excluir</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
