import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, ChevronDown } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage, t, availableLanguages } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);

  const currentLanguage = availableLanguages.find(lang => lang.code === language);

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage as any);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-light-glass dark:bg-dark-glass px-3 py-2 rounded-full hover:bg-lime-accent/10 transition-colors duration-300"
        aria-label="Seleccionar idioma"
      >
        <Globe className="w-4 h-4 text-lime-accent" />
        <span className="text-sm text-light-text dark:text-dark-text">
          {currentLanguage?.flag} {currentLanguage?.name}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-3 h-3 text-light-text-secondary dark:text-dark-text-secondary" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-10"
            />
            
            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full right-0 mt-2 bg-light-surface/90 dark:bg-dark-surface/90 backdrop-blur-glass border border-light-border dark:border-dark-border rounded-xl shadow-glass z-20 min-w-[200px]"
            >
              <div className="p-2">
                {availableLanguages.map((lang) => (
                  <motion.button
                    key={lang.code}
                    whileHover={{ scale: 1.02, x: 4 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleLanguageChange(lang.code)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors duration-200 ${
                      language === lang.code
                        ? 'bg-lime-accent/10 text-lime-accent'
                        : 'text-light-text dark:text-dark-text hover:bg-light-glass dark:hover:bg-dark-glass'
                    }`}
                  >
                    <span className="text-lg">{lang.flag}</span>
                    <span className="font-medium">{lang.name}</span>
                    {language === lang.code && (
                      <motion.div
                        layoutId="languageIndicator"
                        className="w-2 h-2 bg-lime-accent rounded-full ml-auto"
                      />
                    )}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
