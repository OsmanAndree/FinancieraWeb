import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Wallet, TrendingUp, Send, BarChart3, Settings, ChevronLeft, ChevronRight, X } from 'lucide-react';

// Collapsible navigation sidebar with user profile and section switching functionality
interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  isMobileOpen?: boolean;
  onMobileClose?: () => void;
}

const navigation = [
  { id: 'wallet', label: 'Wallet', icon: Wallet },
  { id: 'exchange', label: 'Exchange', icon: TrendingUp },
  { id: 'transfers', label: 'Transfers', icon: Send },
  { id: 'insights', label: 'Insights', icon: BarChart3 },
  { id: 'settings', label: 'Settings', icon: Settings },
];

export const Sidebar: React.FC<SidebarProps> = ({ 
  activeSection, 
  onSectionChange, 
  isMobileOpen = false, 
  onMobileClose 
}) => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Detectar si es móvil
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      if (window.innerWidth >= 1024) {
        setIsCollapsed(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Cerrar sidebar en móvil al cambiar sección
  const handleSectionChange = (section: string) => {
    onSectionChange(section);
    if (isMobile && onMobileClose) {
      onMobileClose();
    }
  };

  const sidebarContent = (
    <motion.div
      initial={{ width: isMobile ? 280 : (isCollapsed ? 80 : 280) }}
      animate={{ 
        width: isMobile ? 280 : (isCollapsed ? 80 : 280),
        x: isMobile ? (isMobileOpen ? 0 : -280) : 0
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={`bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-glass border-r border-light-border dark:border-dark-border flex flex-col h-full transition-colors duration-300 ${
        isMobile ? 'fixed left-0 top-0 z-50' : 'relative'
      }`}
    >
      {/* Header */}
      <div className="p-6 border-b border-light-border dark:border-dark-border flex items-center justify-between">
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: (isCollapsed && !isMobile) ? 0 : 1 }}
          transition={{ duration: 0.2 }}
          className="flex items-center"
        >
          {(!isCollapsed || isMobile) && (
            <div>
              <h1 className="text-lg font-bold text-lime-accent font-editorial">FinanceHub</h1>
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Global Banking</p>
            </div>
          )}
        </motion.div>
        <div className="flex items-center space-x-2">
          {isMobile && onMobileClose && (
            <button
              onClick={onMobileClose}
              className="p-1 rounded-full hover:bg-light-glass dark:hover:bg-dark-glass transition-colors"
              aria-label="Cerrar menú"
            >
              <X className="w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
            </button>
          )}
          {!isMobile && (
            <button
              onClick={() => setIsCollapsed(!isCollapsed)}
              className="p-1 rounded-full hover:bg-light-glass dark:hover:bg-dark-glass transition-colors"
              aria-label={isCollapsed ? "Expandir menú" : "Contraer menú"}
            >
              {isCollapsed ? (
                <ChevronRight className="w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
              ) : (
                <ChevronLeft className="w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
              )}
            </button>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2" role="navigation" aria-label="Navegación principal">
        {navigation.map((item) => (
          <motion.button
            key={item.id}
            onClick={() => handleSectionChange(item.id)}
            className={`w-full flex items-center space-x-4 p-4 rounded-xl transition-all relative group ${
              activeSection === item.id
                ? 'bg-lime-accent/10 text-lime-accent'
                : 'text-light-text dark:text-dark-text hover:bg-light-glass dark:hover:bg-dark-glass hover:text-lime-accent'
            }`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            aria-label={item.label}
            aria-current={activeSection === item.id ? 'page' : undefined}
            role="menuitem"
          >
            <div className={`relative ${activeSection === item.id ? 'drop-shadow-glow' : ''}`}>
              <item.icon className="w-6 h-6" />
              {activeSection === item.id && (
                <motion.div
                  layoutId="activeGlow"
                  className="absolute inset-0 bg-lime-accent/20 rounded-full blur-sm"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
            </div>
            {(!isCollapsed || isMobile) && (
              <motion.span
                initial={{ opacity: 1 }}
                animate={{ opacity: (isCollapsed && !isMobile) ? 0 : 1 }}
                transition={{ duration: 0.2 }}
                className="font-medium font-editorial"
              >
                {item.label}
              </motion.span>
            )}
            {activeSection === item.id && (
              <motion.div
                layoutId="activeIndicator"
                className="absolute right-0 w-1 h-8 bg-lime-accent rounded-l-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
            )}
          </motion.button>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-light-border dark:border-dark-border">
        <div className="flex items-center space-x-3 p-3 bg-light-glass dark:bg-dark-glass rounded-xl">
          <div className="w-8 h-8 bg-lime-accent rounded-full flex items-center justify-center">
            <span className="text-light-base dark:text-dark-base font-bold text-sm">JD</span>
          </div>
          {(!isCollapsed || isMobile) && (
            <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: (isCollapsed && !isMobile) ? 0 : 1 }}
              transition={{ duration: 0.2 }}
            >
              <p className="text-sm font-medium text-light-text dark:text-dark-text">John Doe</p>
              <p className="text-xs text-light-text-secondary dark:text-dark-text-secondary">Premium Member</p>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <>
      {/* Overlay para móvil */}
      <AnimatePresence>
        {isMobile && isMobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onMobileClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          />
        )}
      </AnimatePresence>
      
      {/* Sidebar */}
      {sidebarContent}
    </>
  );
};