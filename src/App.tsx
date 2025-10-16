import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './contexts/ThemeContext';
import { AppDataProvider } from './contexts/AppDataContext';
import { LanguageProvider } from './contexts/LanguageContext';
import { ErrorBoundary } from './components/ErrorBoundary';
import { ToastProvider } from './components/ToastProvider';
import { Sidebar } from './components/Sidebar';
import { TopBar } from './components/TopBar';
import { WalletOverview } from './components/WalletOverview';
import { TransactionTimeline } from './components/TransactionTimeline';
import { ExchangeRates } from './components/ExchangeRates';
import { TransferForm } from './components/TransferForm';
import { CTAStrip } from './components/CTAStrip';

function App() {
  const [activeSection, setActiveSection] = useState('wallet');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderMainContent = () => {
    switch (activeSection) {
      case 'wallet':
        return (
          <div className="space-y-8">
            <WalletOverview />
            <TransactionTimeline />
          </div>
        );
      case 'exchange':
        return <ExchangeRates />;
      case 'transfers':
        return <TransferForm />;
      case 'insights':
        return (
          <div className="flex items-center justify-center h-96">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text font-editorial mb-4">Financial Insights</h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">Coming soon - Advanced analytics and spending insights</p>
            </motion.div>
          </div>
        );
      case 'settings':
        return (
          <div className="flex items-center justify-center h-96">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center"
            >
              <h2 className="text-2xl font-bold text-light-text dark:text-dark-text font-editorial mb-4">Settings</h2>
              <p className="text-light-text-secondary dark:text-dark-text-secondary">Coming soon - Account settings and preferences</p>
            </motion.div>
          </div>
        );
      default:
        return <WalletOverview />;
    }
  };

  return (
    <ErrorBoundary>
      <ThemeProvider>
        <LanguageProvider>
          <AppDataProvider>
            <ToastProvider />
            <AppContent 
              activeSection={activeSection} 
              setActiveSection={setActiveSection} 
              renderMainContent={renderMainContent}
              isMobileMenuOpen={isMobileMenuOpen}
              setIsMobileMenuOpen={setIsMobileMenuOpen}
            />
          </AppDataProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

const AppContent: React.FC<{
  activeSection: string;
  setActiveSection: (section: string) => void;
  renderMainContent: () => React.ReactNode;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}> = ({ activeSection, setActiveSection, renderMainContent, isMobileMenuOpen, setIsMobileMenuOpen }) => {
  return (
    <div className="min-h-screen bg-light-base dark:bg-dark-base text-light-text dark:text-dark-text font-editorial transition-colors duration-300">
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-lime-accent/5 dark:bg-lime-accent/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-lime-accent/3 dark:bg-lime-accent/3 rounded-full blur-3xl"></div>
      </div>

      <div className="flex h-screen relative">
        {/* Sidebar */}
        <Sidebar 
          activeSection={activeSection} 
          onSectionChange={setActiveSection}
          isMobileOpen={isMobileMenuOpen}
          onMobileClose={() => setIsMobileMenuOpen(false)}
        />
        
        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <TopBar onMobileMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)} />
          
          {/* Content Area */}
          <div className="flex-1 overflow-auto pb-20">
            <div className="p-4 sm:p-6 lg:p-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeSection}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {renderMainContent()}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Strip */}
      <CTAStrip />
    </div>
  );
};

export default App;