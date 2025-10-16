import React from 'react';
import { motion } from 'framer-motion';
import { Loader2 } from 'lucide-react';

// Componente de loading spinner
export const LoadingSpinner: React.FC<{ size?: 'sm' | 'md' | 'lg'; className?: string }> = ({ 
  size = 'md', 
  className = '' 
}) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      className={`${sizeClasses[size]} ${className}`}
    >
      <Loader2 className="w-full h-full text-lime-accent" />
    </motion.div>
  );
};

// Componente de loading overlay
export const LoadingOverlay: React.FC<{ message?: string }> = ({ message = 'Cargando...' }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-light-base/80 dark:bg-dark-base/80 backdrop-blur-sm flex items-center justify-center z-50"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="bg-light-surface/90 dark:bg-dark-surface/90 backdrop-blur-glass border border-light-border dark:border-dark-border rounded-2xl p-8 text-center shadow-glass"
      >
        <LoadingSpinner size="lg" className="mx-auto mb-4" />
        <p className="text-light-text dark:text-dark-text font-medium">{message}</p>
      </motion.div>
    </motion.div>
  );
};

// Skeleton para tarjetas de moneda
export const CurrencyCardSkeleton: React.FC = () => {
  return (
    <div className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-xl p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-light-glass dark:bg-dark-glass rounded-full"></div>
          <div>
            <div className="w-12 h-4 bg-light-glass dark:bg-dark-glass rounded mb-2"></div>
            <div className="w-16 h-3 bg-light-glass dark:bg-dark-glass rounded"></div>
          </div>
        </div>
        <div className="w-16 h-4 bg-light-glass dark:bg-dark-glass rounded"></div>
      </div>
      <div className="space-y-2">
        <div className="w-24 h-6 bg-light-glass dark:bg-dark-glass rounded"></div>
        <div className="w-full bg-light-glass dark:bg-dark-glass rounded-full h-1"></div>
      </div>
    </div>
  );
};

// Skeleton para transacciones
export const TransactionSkeleton: React.FC = () => {
  return (
    <div className="flex items-center space-x-4 p-4 animate-pulse">
      <div className="w-12 h-12 bg-light-glass dark:bg-dark-glass rounded-full"></div>
      <div className="flex-1 space-y-2">
        <div className="w-32 h-4 bg-light-glass dark:bg-dark-glass rounded"></div>
        <div className="w-48 h-3 bg-light-glass dark:bg-dark-glass rounded"></div>
        <div className="w-24 h-3 bg-light-glass dark:bg-dark-glass rounded"></div>
      </div>
      <div className="text-right space-y-2">
        <div className="w-20 h-5 bg-light-glass dark:bg-dark-glass rounded"></div>
        <div className="w-16 h-3 bg-light-glass dark:bg-dark-glass rounded"></div>
      </div>
    </div>
  );
};

// Skeleton para tipos de cambio
export const ExchangeRateSkeleton: React.FC = () => {
  return (
    <div className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-xl p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div>
          <div className="w-20 h-5 bg-light-glass dark:bg-dark-glass rounded mb-2"></div>
          <div className="w-32 h-3 bg-light-glass dark:bg-dark-glass rounded"></div>
        </div>
        <div className="w-16 h-4 bg-light-glass dark:bg-dark-glass rounded"></div>
      </div>
      <div className="space-y-3">
        <div className="w-24 h-8 bg-light-glass dark:bg-dark-glass rounded"></div>
        <div className="flex justify-between">
          <div className="w-16 h-3 bg-light-glass dark:bg-dark-glass rounded"></div>
          <div className="w-16 h-3 bg-light-glass dark:bg-dark-glass rounded"></div>
        </div>
        <div className="w-full bg-light-glass dark:bg-dark-glass rounded-full h-1"></div>
      </div>
    </div>
  );
};

// Skeleton para el portafolio total
export const PortfolioSkeleton: React.FC = () => {
  return (
    <div className="bg-gradient-to-br from-light-surface to-light-glass dark:from-dark-surface dark:to-dark-glass border border-light-border dark:border-dark-border rounded-2xl p-8 animate-pulse">
      <div className="w-48 h-4 bg-light-glass dark:bg-dark-glass rounded mb-2"></div>
      <div className="w-32 h-10 bg-light-glass dark:bg-dark-glass rounded mb-3"></div>
      <div className="w-24 h-4 bg-light-glass dark:bg-dark-glass rounded"></div>
    </div>
  );
};

// Hook para simular loading
export const useLoading = (initialState = false) => {
  const [isLoading, setIsLoading] = React.useState(initialState);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);
  const toggleLoading = () => setIsLoading(prev => !prev);

  return {
    isLoading,
    startLoading,
    stopLoading,
    toggleLoading,
  };
};

// Componente de loading con delay mínimo
export const DelayedLoading: React.FC<{ 
  children: React.ReactNode; 
  delay?: number;
  fallback?: React.ReactNode;
}> = ({ children, delay = 300, fallback = <LoadingSpinner /> }) => {
  const [showContent, setShowContent] = React.useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShowContent(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  if (!showContent) {
    return <>{fallback}</>;
  }

  return <>{children}</>;
};
