import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { supabase } from '../services/supabaseClient';
import { Property, PropertyFormData } from '../types';

export function useProperties() {
  const [properties, setProperties] = useState<Property[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchProperties = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProperties(data || []);
    } catch (error: any) {
      toast.error('Erro ao buscar imóveis: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const addProperty = async (data: PropertyFormData) => {
    try {
      const { error } = await supabase.from('properties').insert([data]);
      if (error) throw error;
      toast.success('Imóvel adicionado com sucesso!');
      fetchProperties();
      return true;
    } catch (error: any) {
      toast.error('Erro ao adicionar: ' + error.message);
      return false;
    }
  };

  const updateProperty = async (id: string, data: PropertyFormData) => {
    try {
      const { error } = await supabase.from('properties').update(data).eq('id', id);
      if (error) throw error;
      toast.success('Imóvel atualizado com sucesso!');
      fetchProperties();
      return true;
    } catch (error: any) {
      toast.error('Erro ao atualizar: ' + error.message);
      return false;
    }
  };

  const deleteProperty = async (id: string) => {
    try {
      const { error } = await supabase.from('properties').delete().eq('id', id);
      if (error) throw error;
      toast.success('Imóvel excluído!');
      fetchProperties();
      return true;
    } catch (error: any) {
      toast.error('Erro ao deletar: ' + error.message);
      return false;
    }
  };

  const sendInquiry = async (data: any) => {
    try {
      const { error } = await supabase.from('inquiries').insert([data]);
      if (error) throw error;
      toast.success('Mensagem enviada com sucesso! Entraremos em contato em breve.');
      return true;
    } catch (error: any) {
      toast.error('Erro ao enviar mensagem: ' + error.message);
      return false;
    }
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  return { properties, loading, addProperty, updateProperty, deleteProperty, sendInquiry, fetchProperties };
}
