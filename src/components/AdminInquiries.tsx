import { Mail, Phone, Trash2, User } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '../services/supabaseClient';
import { Inquiry } from '../types';
import { formatCurrency } from '../lib/utils';

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState<(Inquiry & { properties?: { title: string } | null })[]>([]);
  const [loading, setLoading] = useState(true);

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
    try {
      const { error } = await supabase.from('inquiries').delete().eq('id', id);
      if (error) throw error;
      toast.success('Mensagem excluída.');
      fetchInquiries();
    } catch (error: any) {
      toast.error('Erro ao excluir: ' + error.message);
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
              className="bg-white dark:bg-gray-900 p-6 rounded-2xl border border-gray-100 dark:border-gray-800 shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex flex-col md:flex-row justify-between gap-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <div className="p-2 bg-brand-gold/10 rounded-full">
                      <User className="w-4 h-4 text-brand-gold" />
                    </div>
                    <div>
                      <h4 className="font-bold text-lg">{inquiry.name}</h4>
                      <p className="text-xs text-gray-500">
                        {inquiry.created_at ? new Date(inquiry.created_at).toLocaleString('pt-BR') : ''}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <a href={`mailto:${inquiry.email}`} className="flex items-center gap-2 hover:text-brand-gold transition-colors">
                      <Mail className="w-4 h-4" />
                      {inquiry.email}
                    </a>
                    <a href={`tel:${inquiry.phone}`} className="flex items-center gap-2 hover:text-brand-gold transition-colors">
                      <Phone className="w-4 h-4" />
                      {inquiry.phone}
                    </a>
                  </div>

                  <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800 mt-2">
                    <p className="text-sm italic">"{inquiry.message}"</p>
                  </div>
                </div>

                <div className="flex flex-col justify-between items-end gap-4 min-w-[200px]">
                  {inquiry.properties && (
                    <div className="text-right">
                      <span className="text-[10px] font-bold uppercase text-brand-gold tracking-widest block mb-1">Interesse em:</span>
                      <p className="text-sm font-semibold text-brand-dark dark:text-white line-clamp-1">
                        {inquiry.properties.title}
                      </p>
                    </div>
                  )}
                  <button
                    onClick={() => deleteInquiry(inquiry.id)}
                    className="p-3 text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-xl transition-all"
                    title="Excluir mensagem"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
