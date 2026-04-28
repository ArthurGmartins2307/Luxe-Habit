import { AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { Toaster } from 'sonner';
import AdminInquiries from './components/AdminInquiries';
import ContactModal from './components/ContactModal';
import FilterBar from './components/FilterBar';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import PropertyCard from './components/PropertyCard';
import PropertyModal from './components/PropertyModal';
import { useProperties } from './hooks/useProperties';
import { InquiryFormData, Property, PropertyFormData } from './types';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminTab, setAdminTab] = useState<'properties' | 'inquiries'>('properties');
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, Infinity]);
  const [selectedProperty, setSelectedProperty] = useState<Property | null | undefined>(undefined);
  const [contactingProperty, setContactingProperty] = useState<Property | null>(null);
  
  const { properties, loading, addProperty, updateProperty, deleteProperty, sendInquiry } = useProperties();

  const filteredProperties = properties.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || 
                         p.location.toLowerCase().includes(search.toLowerCase());
    const matchesType = typeFilter ? p.type === typeFilter : true;
    const matchesPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return matchesSearch && matchesType && matchesPrice;
  });

  const featuredProperties = filteredProperties.filter(p => p.is_featured);
  const otherProperties = filteredProperties.filter(p => !p.is_featured);

  const handleFormSubmit = async (data: PropertyFormData) => {
    let success = false;
    if (selectedProperty) {
      success = await updateProperty(selectedProperty.id, data);
    } else {
      success = await addProperty(data);
    }
    if (success) setSelectedProperty(undefined);
  };

  const handleInquirySubmit = async (data: InquiryFormData) => {
    if (!contactingProperty) return;
    const success = await sendInquiry({
      ...data,
      property_id: contactingProperty.id
    });
    if (success) setContactingProperty(null);
  };

  return (
    <div className="min-h-screen">
      <Navbar isAdmin={isAdmin} onAdminToggle={(val) => {
        setIsAdmin(val);
        if (!val) setAdminTab('properties');
      }} />
      
      <main>
        <Hero />
        <FilterBar 
          search={search} 
          setSearch={setSearch}
          typeFilter={typeFilter}
          setTypeFilter={setTypeFilter}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
        />

        <div className="max-w-7xl mx-auto px-4 py-20 pb-40">
          {/* Admin Header / Tabs */}
          {isAdmin && (
            <div className="flex flex-wrap items-center gap-4 mb-12 bg-slate-100 dark:bg-gray-900/50 p-1.5 rounded-2xl w-fit border border-slate-200 dark:border-gray-800 shadow-inner">
              <button
                onClick={() => setAdminTab('properties')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${adminTab === 'properties' ? 'bg-white dark:bg-gray-800 shadow-md text-brand-gold ring-1 ring-slate-200 dark:ring-gray-700' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Gerenciar Imóveis
              </button>
              <button
                onClick={() => setAdminTab('inquiries')}
                className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${adminTab === 'inquiries' ? 'bg-white dark:bg-gray-800 shadow-md text-brand-gold ring-1 ring-slate-200 dark:ring-gray-700' : 'text-slate-500 hover:text-slate-700'}`}
              >
                Mensagens / Leads
              </button>
            </div>
          )}

          {/* Header Section */}
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-display font-bold mb-4">
                {isAdmin && adminTab === 'inquiries' ? 'Centro de' : 'Imóveis'}{' '}
                <span className="text-brand-gold italic">
                  {isAdmin && adminTab === 'inquiries' ? 'Leads' : 'Exclusivos'}
                </span>
              </h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-lg">
                {isAdmin && adminTab === 'inquiries' 
                  ? 'Acompanhe todas as solicitações de contato e propostas recebidas através do portal.'
                  : 'Explore nossa curadoria de residências de alto padrão, cada uma com design único e acabamentos impecáveis.'}
              </p>
            </div>
            {isAdmin && adminTab === 'properties' && (
              <button
                onClick={() => setSelectedProperty(null)}
                className="px-6 py-3 bg-brand-gold text-white font-bold rounded-xl shadow-lg hover:shadow-brand-gold/20 hover:-translate-y-1 transition-all"
              >
                + Adicionar Imóvel
              </button>
            )}
          </div>

          {isAdmin && adminTab === 'inquiries' ? (
            <AdminInquiries />
          ) : (
            <>
              {loading ? (
                <div className="flex flex-col items-center justify-center py-20 gap-4">
                  <div className="w-12 h-12 border-4 border-brand-gold border-t-transparent rounded-full animate-spin" />
                  <p className="text-sm font-bold uppercase tracking-widest text-gray-500">Buscando oportunidades...</p>
                </div>
              ) : (
                <div className="space-y-24">
                  {/* Featured Grid */}
                  {featuredProperties.length > 0 && (
                    <section>
                      <div className="flex items-center gap-4 mb-8">
                        <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
                        <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-brand-gold">Em Destaque</h3>
                        <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        <AnimatePresence mode="popLayout">
                          {featuredProperties.map((p) => (
                            <PropertyCard 
                              key={p.id} 
                              property={p} 
                              isAdmin={isAdmin}
                              onEdit={(prop) => setSelectedProperty(prop)}
                              onDelete={deleteProperty}
                              onContact={(prop) => setContactingProperty(prop)}
                            />
                          ))}
                        </AnimatePresence>
                      </div>
                    </section>
                  )}

                  {/* All Properties Grid */}
                  <section>
                    <div className="flex items-center gap-4 mb-8">
                      <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
                      <h3 className="text-xs font-bold uppercase tracking-[0.3em] text-gray-400 dark:text-gray-600">Catálogo Completo</h3>
                      <span className="h-px flex-1 bg-gray-200 dark:bg-gray-800" />
                    </div>
                    {otherProperties.length > 0 ? (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                        <AnimatePresence mode="popLayout">
                          {otherProperties.map((p) => (
                            <PropertyCard 
                              key={p.id} 
                              property={p} 
                              isAdmin={isAdmin}
                              onEdit={(prop) => setSelectedProperty(prop)}
                              onDelete={deleteProperty}
                              onContact={(prop) => setContactingProperty(prop)}
                            />
                          ))}
                        </AnimatePresence>
                      </div>
                    ) : featuredProperties.length === 0 ? (
                      <div className="text-center py-20 bg-gray-50 dark:bg-gray-900/50 rounded-3xl border border-dashed border-gray-200 dark:border-gray-800">
                        <p className="text-lg text-gray-500">Nenhum imóvel encontrado com esses filtros.</p>
                      </div>
                    ) : null}
                  </section>
                </div>
              )}
            </>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            &copy; {new Date().getFullYear()} LuxeHabitat Marketplace. Todos os direitos reservados.
          </p>
        </div>
      </footer>

      <AnimatePresence>
        {selectedProperty !== undefined && (
          <PropertyModal 
            property={selectedProperty} 
            onClose={() => setSelectedProperty(undefined)} 
            onSubmit={handleFormSubmit}
          />
        )}
        {contactingProperty && (
          <ContactModal
            property={contactingProperty}
            onClose={() => setContactingProperty(null)}
            onSubmit={handleInquirySubmit}
          />
        )}
      </AnimatePresence>

      <Toaster position="top-right" richColors closeButton expand />
    </div>
  );
}


