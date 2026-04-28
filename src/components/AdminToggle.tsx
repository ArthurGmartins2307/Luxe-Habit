import { Shield, User } from 'lucide-react';
import { cn } from '../lib/utils';

interface AdminToggleProps {
  isAdmin: boolean;
  onToggle: (val: boolean) => void;
}

export default function AdminToggle({ isAdmin, onToggle }: AdminToggleProps) {
  return (
    <div className="flex items-center gap-2 bg-slate-100 dark:bg-gray-900 p-1.5 rounded-full border border-slate-200 dark:border-gray-800 shadow-inner">
      <button
        onClick={() => onToggle(false)}
        className={cn(
          "flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all",
          !isAdmin 
            ? "bg-white dark:bg-gray-800 shadow-md text-slate-900 dark:text-white ring-1 ring-slate-200 dark:ring-gray-700" 
            : "text-slate-700 hover:text-slate-900 dark:text-gray-500 dark:hover:text-gray-300"
        )}
      >
        <User className="w-3.5 h-3.5" />
        Usuário
      </button>
      <button
        onClick={() => onToggle(true)}
        className={cn(
          "flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all",
          isAdmin 
            ? "bg-brand-gold text-white shadow-md ring-1 ring-brand-gold/50" 
            : "text-slate-700 hover:text-slate-900 dark:text-gray-500 dark:hover:text-gray-300"
        )}
      >
        <Shield className="w-3.5 h-3.5" />
        Admin
      </button>
    </div>
  );
}
