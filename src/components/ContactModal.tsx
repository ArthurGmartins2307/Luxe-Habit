import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Property } from '../types';

const inquirySchema = z.object({
  name: z.string().min(3, 'Nome é obrigatório'),
  email: z.string().email('E-mail inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  message: z.string().min(10, 'Mensagem muito curta'),
});

type InquiryFormData = z.infer<typeof inquirySchema>;

interface ContactModalProps {
  property: Property;
  onClose: () => void;
  onSubmit: (data: InquiryFormData) => Promise<void>;
}

export default function ContactModal({ property, onClose, onSubmit }: ContactModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<InquiryFormData>({
    resolver: zodResolver(inquirySchema),
  });

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 w-full max-w-md rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="bg-brand-dark p-6 text-white relative">
          <button 
            onClick={onClose} 
            className="absolute top-4 right-4 p-2 hover:bg-white/10 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <span className="text-[10px] font-bold uppercase tracking-widest text-brand-gold">Interesse no Imóvel</span>
          <h2 className="text-xl font-display font-bold mt-1 line-clamp-1">{property.title}</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-gray-500">Nome Completo</label>
            <input
              {...register('name')}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border rounded-xl outline-none focus:ring-2 focus:ring-brand-gold"
              placeholder="Seu nome"
            />
            {errors.name && <p className="text-red-500 text-[10px]">{errors.name.message}</p>}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-gray-500">E-mail</label>
              <input
                {...register('email')}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border rounded-xl outline-none focus:ring-2 focus:ring-brand-gold"
                placeholder="exemplo@email.com"
              />
              {errors.email && <p className="text-red-500 text-[10px]">{errors.email.message}</p>}
            </div>
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-gray-500">Telefone</label>
              <input
                {...register('phone')}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border rounded-xl outline-none focus:ring-2 focus:ring-brand-gold"
                placeholder="(00) 00000-0000"
              />
              {errors.phone && <p className="text-red-500 text-[10px]">{errors.phone.message}</p>}
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-gray-500">Mensagem</label>
            <textarea
              {...register('message')}
              rows={3}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border rounded-xl outline-none focus:ring-2 focus:ring-brand-gold resize-none"
              placeholder="Tenho interesse neste imóvel..."
            />
            {errors.message && <p className="text-red-500 text-[10px]">{errors.message.message}</p>}
          </div>

          <button
            disabled={isSubmitting}
            className="w-full py-4 bg-brand-gold text-white font-bold rounded-2xl hover:opacity-90 transition-opacity disabled:opacity-50 shadow-lg shadow-brand-gold/20"
          >
            {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
