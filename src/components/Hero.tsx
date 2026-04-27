import { motion } from 'motion/react';

export default function Hero() {
  return (
    <div className="relative w-full h-[60vh] md:h-[70vh] flex items-center justify-center overflow-hidden">
      {/* Background with Overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80"
          alt="Modern House"
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-brand-dark/50 dark:bg-brand-dark/70 transition-colors" />
      </div>

      <div className="relative z-10 text-center max-w-4xl px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="inline-block text-brand-gold text-xs font-bold uppercase tracking-[0.3em] mb-4">
            Elegância & Sofisticação
          </span>
          <h1 className="text-4xl md:text-7xl font-display font-bold text-white mb-6 leading-tight">
            Encontre o Lar dos Seus <span className="text-brand-gold italic">Sonhos</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 font-light max-w-2xl mx-auto mb-8">
            Uma seleção exclusiva de imóveis de luxo nas localizações mais cobiçadas do país. 
            Arquitetura moderna e conforto inigualável.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
