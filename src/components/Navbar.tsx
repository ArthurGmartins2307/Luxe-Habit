import { Home, Menu, X } from 'lucide-react';
import { useState } from 'react';
import AdminToggle from './AdminToggle';
import ThemeToggle from './ThemeToggle';

interface NavbarProps {
  isAdmin: boolean;
  onAdminToggle: (val: boolean) => void;
}

export default function Navbar({ isAdmin, onAdminToggle }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 dark:border-gray-800 bg-white/80 dark:bg-brand-dark/80 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <Home className="w-8 h-8 text-brand-gold" />
            <span className="font-display text-xl font-bold tracking-tight text-brand-dark dark:text-brand-light">
              Luxe<span className="text-brand-gold font-normal italic">Habitat</span>
            </span>
          </div>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm font-medium hover:text-brand-gold transition-colors">Início</a>
              <a href="#" className="text-sm font-medium hover:text-brand-gold transition-colors">Imóveis</a>
              <a href="#" className="text-sm font-medium hover:text-brand-gold transition-colors">Sobre</a>
              <a href="#" className="text-sm font-medium hover:text-brand-gold transition-colors">Contato</a>
            </div>
            <div className="h-6 w-px bg-gray-200 dark:bg-gray-800 mx-2" />
            <div className="flex items-center gap-4">
              <AdminToggle isAdmin={isAdmin} onToggle={onAdminToggle} />
              <ThemeToggle />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
            >
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-brand-dark border-b border-gray-200 dark:border-gray-800 p-4 space-y-4">
          <div className="flex flex-col gap-4">
            <a href="#" className="text-lg font-medium">Início</a>
            <a href="#" className="text-lg font-medium">Imóveis</a>
            <a href="#" className="text-lg font-medium">Sobre</a>
            <a href="#" className="text-lg font-medium">Contato</a>
          </div>
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800 flex justify-between items-center">
            <AdminToggle isAdmin={isAdmin} onToggle={onAdminToggle} />
          </div>
        </div>
      )}
    </nav>
  );
}
