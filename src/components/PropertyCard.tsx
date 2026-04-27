import { Edit, MapPin, Trash2 } from 'lucide-react';
import { motion } from 'motion/react';
import { cn, formatCurrency } from '../lib/utils';
import { Property } from '../types';

interface PropertyCardProps {
  property: Property;
  isAdmin: boolean;
  onEdit: (property: Property) => void;
  onDelete: (id: string) => void;
  onContact: (property: Property) => void;
}

export default function PropertyCard({ property, isAdmin, onEdit, onDelete, onContact }: PropertyCardProps) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5 }}
      className="group relative bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all border border-gray-100 dark:border-gray-800"
    >
      {/* Featured Badge */}
      {property.is_featured && (
        <div className="absolute top-4 left-4 z-10 bg-brand-gold text-white text-[10px] uppercase font-bold tracking-widest px-2 py-1 rounded-sm shadow-lg">
          Destaque
        </div>
      )}

      {/* Admin Actions Overlay */}
      {isAdmin && (
        <div className="absolute top-4 right-4 z-20 flex gap-2">
          <button
            onClick={() => onEdit(property)}
            className="p-2 bg-white/90 dark:bg-gray-800/90 hover:bg-brand-gold hover:text-white rounded-full transition-colors shadow-sm backdrop-blur-sm"
          >
            <Edit className="w-4 h-4" />
          </button>
          <button
            onClick={() => onDelete(property.id)}
            className="p-2 bg-white/90 dark:bg-gray-800/90 hover:bg-red-500 hover:text-white rounded-full transition-colors shadow-sm backdrop-blur-sm"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Image UI */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={property.image_url || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=80'}
          alt={property.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <span className="text-[11px] font-bold text-brand-gold uppercase tracking-wider">
            {property.type}
          </span>
          <span className="text-lg font-display font-bold text-brand-dark dark:text-white">
            {formatCurrency(property.price)}
          </span>
        </div>
        
        <h3 className="text-lg font-semibold mb-2 line-clamp-1 group-hover:text-brand-gold transition-colors">
          {property.title}
        </h3>
        
        <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400 text-sm mb-4">
          <MapPin className="w-3 h-3" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4 h-10">
          {property.description}
        </p>

        <button 
          onClick={() => onContact(property)}
          className="w-full py-3 bg-gray-50 dark:bg-gray-800 hover:bg-brand-gold hover:text-white transition-all rounded-xl text-sm font-semibold border border-gray-200 dark:border-gray-700 hover:border-brand-gold"
        >
          Tenho Interesse
        </button>
      </div>
    </motion.div>
  );
}
