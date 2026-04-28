import { Search, SlidersHorizontal } from 'lucide-react';

interface FilterBarProps {
  search: string;
  setSearch: (val: string) => void;
  typeFilter: string;
  setTypeFilter: (val: string) => void;
  priceRange: [number, number];
  setPriceRange: (val: [number, number]) => void;
}

export default function FilterBar({
  search,
  setSearch,
  typeFilter,
  setTypeFilter,
  priceRange,
  setPriceRange,
}: FilterBarProps) {
  return (
    <div className="w-full max-w-5xl mx-auto -mt-16 relative z-20 px-4">
      <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl border border-slate-200 dark:border-gray-800 p-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {/* Search */}
          <div className="md:col-span-2 space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Localização / Nome</label>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Ex: São Paulo, Casa no Campo..."
                className="w-full pl-12 pr-4 py-4 bg-slate-50 dark:bg-gray-800 border-2 border-slate-200 dark:border-gray-700 rounded-2xl focus:ring-2 focus:ring-brand-gold outline-none transition-all dark:text-white text-slate-900 shadow-sm"
              />
            </div>
          </div>

          {/* Type */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Tipo de Imóvel</label>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="w-full px-4 py-4 bg-slate-50 dark:bg-gray-800 border-2 border-slate-200 dark:border-gray-700 rounded-2xl outline-none transition-all focus:ring-2 focus:ring-brand-gold appearance-none dark:text-white text-slate-900 shadow-sm"
            >
              <option value="">Todos os tipos</option>
              <option value="Casa">Casa</option>
              <option value="Apartamento">Apartamento</option>
              <option value="Terreno">Terreno</option>
              <option value="Mansão">Mansão</option>
            </select>
          </div>

          {/* Pricing range simulation */}
          <div className="space-y-2">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500">Faixa de Preço</label>
            <div className="flex items-center gap-3 px-4 py-4 bg-slate-50 dark:bg-gray-800 border-2 border-slate-200 dark:border-gray-700 rounded-2xl shadow-sm">
              <SlidersHorizontal className="w-4 h-4 text-brand-gold shrink-0" />
              <select 
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (val === 0) setPriceRange([0, Infinity]);
                  else if (val === 1) setPriceRange([0, 500000]);
                  else if (val === 2) setPriceRange([500000, 2000000]);
                  else if (val === 3) setPriceRange([2000000, Infinity]);
                }}
                className="w-full text-sm outline-none bg-transparent dark:text-white text-slate-900 border-none p-0"
              >
                <option value="0">Qualquer preço</option>
                <option value="1">Até R$ 500k</option>
                <option value="2">R$ 500k - R$ 2M</option>
                <option value="3">Acima de R$ 2M</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
