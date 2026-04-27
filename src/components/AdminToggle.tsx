import { Shield, User } from 'lucide-react';
import { cn } from '../lib/utils';

interface AdminToggleProps {
  isAdmin: boolean;
  onToggle: (val: boolean) => void;
}

export default function AdminToggle({ isAdmin, onToggle }: AdminToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-900 p-1 rounded-full">
      <button
        onClick={() => onToggle(false)}
        className={cn(
          "flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all",
          !isAdmin 
            ? "bg-white dark:bg-gray-800 shadow-sm text-brand-dark dark:text-white" 
            : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        )}
      >
        <User className="w-3.5 h-3.5" />
        Usuário
      </button>
      <button
        onClick={() => onToggle(true)}
        className={cn(
          "flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium transition-all",
          isAdmin 
            ? "bg-brand-gold text-white shadow-sm" 
            : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
        )}
      >
        <Shield className="w-3.5 h-3.5" />
        Admin
      </button>
    </div>
  );
}
