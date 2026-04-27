import { zodResolver } from '@hookform/resolvers/zod';
import { X } from 'lucide-react';
import { motion } from 'motion/react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Property, PropertyFormData } from '../types';

const propertySchema = z.object({
  title: z.string().min(3, 'Título deve ter pelo menos 3 caracteres'),
  location: z.string().min(3, 'Localização é obrigatória'),
  price: z.number().min(1000, 'Preço deve ser maior que 1000'),
  image_url: z.string().url('URL da imagem inválida'),
  description: z.string().min(10, 'Descrição muito curta'),
  type: z.string().min(1, 'Selecione um tipo'),
  is_featured: z.boolean().default(false),
});

interface PropertyModalProps {
  property?: Property | null;
  onClose: () => void;
  onSubmit: (data: PropertyFormData) => void;
}

export default function PropertyModal({ property, onClose, onSubmit }: PropertyModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFormData>({
    resolver: zodResolver(propertySchema),
    defaultValues: property ? {
      title: property.title,
      location: property.location,
      price: property.price,
      image_url: property.image_url,
      description: property.description,
      type: property.type,
      is_featured: property.is_featured,
    } : {
      is_featured: false,
      type: 'Casa',
    },
  });

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white dark:bg-gray-900 w-full max-w-xl rounded-3xl overflow-hidden shadow-2xl"
      >
        <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-gray-800">
          <h2 className="text-xl font-display font-bold">
            {property ? 'Editar Imóvel' : 'Novo Imóvel'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4 overflow-y-auto max-h-[70vh]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-gray-500">Título</label>
              <input
                {...register('title')}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border rounded-xl outline-none focus:ring-2 focus:ring-brand-gold"
                placeholder="Ex: Mansão em Alphaville"
              />
              {errors.title && <p className="text-red-500 text-[10px]">{errors.title.message}</p>}
            </div>

            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-gray-500">Tipo</label>
              <select
                {...register('type')}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border rounded-xl outline-none focus:ring-2 focus:ring-brand-gold"
              >
                <option value="Casa">Casa</option>
                <option value="Apartamento">Apartamento</option>
                <option value="Terreno">Terreno</option>
                <option value="Mansão">Mansão</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-gray-500">Localização</label>
            <input
              {...register('location')}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border rounded-xl outline-none focus:ring-2 focus:ring-brand-gold"
            />
            {errors.location && <p className="text-red-500 text-[10px]">{errors.location.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-bold uppercase text-gray-500">Preço (BRL)</label>
              <input
                type="number"
                {...register('price', { valueAsNumber: true })}
                className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border rounded-xl outline-none focus:ring-2 focus:ring-brand-gold"
              />
              {errors.price && <p className="text-red-500 text-[10px]">{errors.price.message}</p>}
            </div>

            <div className="flex items-center gap-2 pt-6">
              <input
                type="checkbox"
                {...register('is_featured')}
                className="w-4 h-4 accent-brand-gold"
              />
              <label className="text-sm font-medium">Imóvel em Destaque</label>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-gray-500">URL da Imagem</label>
            <input
              {...register('image_url')}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border rounded-xl outline-none focus:ring-2 focus:ring-brand-gold"
              placeholder="https://..."
            />
            {errors.image_url && <p className="text-red-500 text-[10px]">{errors.image_url.message}</p>}
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold uppercase text-gray-500">Descrição</label>
            <textarea
              {...register('description')}
              rows={3}
              className="w-full px-4 py-2 bg-gray-50 dark:bg-gray-800 border rounded-xl outline-none focus:ring-2 focus:ring-brand-gold resize-none"
            />
            {errors.description && <p className="text-red-500 text-[10px]">{errors.description.message}</p>}
          </div>

          <div className="pt-4">
            <button
              disabled={isSubmitting}
              className="w-full py-4 bg-brand-dark dark:bg-brand-gold text-white font-bold rounded-2xl hover:opacity-90 transition-opacity disabled:opacity-50"
            >
              {isSubmitting ? 'Salvando...' : 'Salvar Imóvel'}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
