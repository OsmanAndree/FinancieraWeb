import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Tipos de idiomas soportados
export type Language = 'es' | 'en' | 'fr' | 'de';

// Traducciones
const translations = {
  es: {
    // Navegación
    wallet: 'Cartera',
    exchange: 'Intercambio',
    transfers: 'Transferencias',
    insights: 'Análisis',
    settings: 'Configuración',
    
    // Wallet Overview
    portfolioOverview: 'Resumen del Portafolio',
    globalCurrencyPositions: 'Tus posiciones de moneda global',
    totalPortfolioValue: 'Valor Total del Portafolio',
    balance: 'Balance',
    thisMonth: 'este mes',
    hideBalances: 'Ocultar balances',
    showBalances: 'Mostrar balances',
    balancesHidden: 'Balances ocultados',
    balancesShown: 'Balances mostrados',
    
    // Transactions
    recentActivity: 'Actividad Reciente',
    latestTransactions: 'Tus últimas transacciones en todas las monedas',
    viewAllTransactions: 'Ver Todas las Transacciones',
    
    // Exchange Rates
    liveExchangeRates: 'Tipos de Cambio en Vivo',
    realTimeRates: 'Tasas en tiempo real vs bancos principales',
    lastUpdate: 'Última actualización',
    bankRate: 'Tasa Bancaria',
    ourAdvantage: 'Nuestra Ventaja',
    quickExchange: 'Intercambio Rápido',
    from: 'Desde',
    to: 'Hasta',
    exchangeNow: 'Intercambiar Ahora',
    ratesUpdated: 'Tipos de cambio actualizados',
    
    // Common
    encrypted: 'Encriptado',
    openMenu: 'Abrir menú',
    closeMenu: 'Cerrar menú',
    expandMenu: 'Expandir menú',
    collapseMenu: 'Contraer menú',
    loading: 'Cargando...',
    error: 'Error',
    success: 'Éxito',
    warning: 'Advertencia',
    info: 'Información',
    
    // Error Boundary
    somethingWentWrong: '¡Ups! Algo salió mal',
    unexpectedError: 'Ha ocurrido un error inesperado. No te preocupes, tus datos están seguros.',
    tryAgain: 'Intentar de nuevo',
    reloadPage: 'Recargar página',
    errorDetails: 'Detalles del error (desarrollo)',
    ifProblemPersists: 'Si el problema persiste, contacta al soporte técnico.',
    
    // Coming Soon
    comingSoon: 'Próximamente',
    internationalTransfers: 'Transferencias Internacionales',
    internationalTransfersDesc: 'Próximamente - Envía dinero globalmente con seguimiento de viaje animado',
    financialInsights: 'Análisis Financiero',
    financialInsightsDesc: 'Próximamente - Análisis avanzado e insights de gastos',
    settingsDesc: 'Próximamente - Configuración de cuenta y preferencias',
  },
  en: {
    // Navigation
    wallet: 'Wallet',
    exchange: 'Exchange',
    transfers: 'Transfers',
    insights: 'Insights',
    settings: 'Settings',
    
    // Wallet Overview
    portfolioOverview: 'Portfolio Overview',
    globalCurrencyPositions: 'Your global currency positions',
    totalPortfolioValue: 'Total Portfolio Value',
    balance: 'Balance',
    thisMonth: 'this month',
    hideBalances: 'Hide balances',
    showBalances: 'Show balances',
    balancesHidden: 'Balances hidden',
    balancesShown: 'Balances shown',
    
    // Transactions
    recentActivity: 'Recent Activity',
    latestTransactions: 'Your latest transactions across all currencies',
    viewAllTransactions: 'View All Transactions',
    
    // Exchange Rates
    liveExchangeRates: 'Live Exchange Rates',
    realTimeRates: 'Real-time rates vs major banks',
    lastUpdate: 'Last update',
    bankRate: 'Bank Rate',
    ourAdvantage: 'Our Advantage',
    quickExchange: 'Quick Exchange',
    from: 'From',
    to: 'To',
    exchangeNow: 'Exchange Now',
    ratesUpdated: 'Exchange rates updated',
    
    // Common
    encrypted: 'Encrypted',
    openMenu: 'Open menu',
    closeMenu: 'Close menu',
    expandMenu: 'Expand menu',
    collapseMenu: 'Collapse menu',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    warning: 'Warning',
    info: 'Info',
    
    // Error Boundary
    somethingWentWrong: 'Oops! Something went wrong',
    unexpectedError: 'An unexpected error has occurred. Don\'t worry, your data is safe.',
    tryAgain: 'Try again',
    reloadPage: 'Reload page',
    errorDetails: 'Error details (development)',
    ifProblemPersists: 'If the problem persists, contact technical support.',
    
    // Coming Soon
    comingSoon: 'Coming Soon',
    internationalTransfers: 'International Transfers',
    internationalTransfersDesc: 'Coming soon - Send money globally with animated journey tracking',
    financialInsights: 'Financial Insights',
    financialInsightsDesc: 'Coming soon - Advanced analytics and spending insights',
    settingsDesc: 'Coming soon - Account settings and preferences',
  },
  fr: {
    // Navigation
    wallet: 'Portefeuille',
    exchange: 'Échange',
    transfers: 'Transferts',
    insights: 'Analyses',
    settings: 'Paramètres',
    
    // Wallet Overview
    portfolioOverview: 'Aperçu du Portefeuille',
    globalCurrencyPositions: 'Vos positions de devises mondiales',
    totalPortfolioValue: 'Valeur Totale du Portefeuille',
    balance: 'Solde',
    thisMonth: 'ce mois-ci',
    hideBalances: 'Masquer les soldes',
    showBalances: 'Afficher les soldes',
    balancesHidden: 'Soldes masqués',
    balancesShown: 'Soldes affichés',
    
    // Transactions
    recentActivity: 'Activité Récente',
    latestTransactions: 'Vos dernières transactions dans toutes les devises',
    viewAllTransactions: 'Voir Toutes les Transactions',
    
    // Exchange Rates
    liveExchangeRates: 'Taux de Change en Direct',
    realTimeRates: 'Taux en temps réel vs banques principales',
    lastUpdate: 'Dernière mise à jour',
    bankRate: 'Taux Bancaire',
    ourAdvantage: 'Notre Avantage',
    quickExchange: 'Échange Rapide',
    from: 'De',
    to: 'Vers',
    exchangeNow: 'Échanger Maintenant',
    ratesUpdated: 'Taux de change mis à jour',
    
    // Common
    encrypted: 'Chiffré',
    openMenu: 'Ouvrir le menu',
    closeMenu: 'Fermer le menu',
    expandMenu: 'Développer le menu',
    collapseMenu: 'Réduire le menu',
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    warning: 'Avertissement',
    info: 'Info',
    
    // Error Boundary
    somethingWentWrong: 'Oups! Quelque chose s\'est mal passé',
    unexpectedError: 'Une erreur inattendue s\'est produite. Ne vous inquiétez pas, vos données sont sûres.',
    tryAgain: 'Réessayer',
    reloadPage: 'Recharger la page',
    errorDetails: 'Détails de l\'erreur (développement)',
    ifProblemPersists: 'Si le problème persiste, contactez le support technique.',
    
    // Coming Soon
    comingSoon: 'Bientôt Disponible',
    internationalTransfers: 'Transferts Internationaux',
    internationalTransfersDesc: 'Bientôt disponible - Envoyez de l\'argent dans le monde entier avec suivi de voyage animé',
    financialInsights: 'Analyses Financières',
    financialInsightsDesc: 'Bientôt disponible - Analyses avancées et insights de dépenses',
    settingsDesc: 'Bientôt disponible - Paramètres de compte et préférences',
  },
  de: {
    // Navigation
    wallet: 'Brieftasche',
    exchange: 'Austausch',
    transfers: 'Überweisungen',
    insights: 'Einblicke',
    settings: 'Einstellungen',
    
    // Wallet Overview
    portfolioOverview: 'Portfolio-Übersicht',
    globalCurrencyPositions: 'Ihre globalen Währungspositionen',
    totalPortfolioValue: 'Gesamter Portfolio-Wert',
    balance: 'Guthaben',
    thisMonth: 'diesen Monat',
    hideBalances: 'Guthaben ausblenden',
    showBalances: 'Guthaben anzeigen',
    balancesHidden: 'Guthaben ausgeblendet',
    balancesShown: 'Guthaben angezeigt',
    
    // Transactions
    recentActivity: 'Aktuelle Aktivität',
    latestTransactions: 'Ihre neuesten Transaktionen in allen Währungen',
    viewAllTransactions: 'Alle Transaktionen Anzeigen',
    
    // Exchange Rates
    liveExchangeRates: 'Live-Wechselkurse',
    realTimeRates: 'Echtzeit-Kurse vs. große Banken',
    lastUpdate: 'Letzte Aktualisierung',
    bankRate: 'Bankkurs',
    ourAdvantage: 'Unser Vorteil',
    quickExchange: 'Schneller Austausch',
    from: 'Von',
    to: 'Nach',
    exchangeNow: 'Jetzt Tauschen',
    ratesUpdated: 'Wechselkurse aktualisiert',
    
    // Common
    encrypted: 'Verschlüsselt',
    openMenu: 'Menü öffnen',
    closeMenu: 'Menü schließen',
    expandMenu: 'Menü erweitern',
    collapseMenu: 'Menü reduzieren',
    loading: 'Laden...',
    error: 'Fehler',
    success: 'Erfolg',
    warning: 'Warnung',
    info: 'Info',
    
    // Error Boundary
    somethingWentWrong: 'Ups! Etwas ist schiefgelaufen',
    unexpectedError: 'Ein unerwarteter Fehler ist aufgetreten. Keine Sorge, Ihre Daten sind sicher.',
    tryAgain: 'Erneut versuchen',
    reloadPage: 'Seite neu laden',
    errorDetails: 'Fehlerdetails (Entwicklung)',
    ifProblemPersists: 'Wenn das Problem weiterhin besteht, wenden Sie sich an den technischen Support.',
    
    // Coming Soon
    comingSoon: 'Demnächst Verfügbar',
    internationalTransfers: 'Internationale Überweisungen',
    internationalTransfersDesc: 'Demnächst verfügbar - Senden Sie Geld weltweit mit animierter Reiseverfolgung',
    financialInsights: 'Finanzielle Einblicke',
    financialInsightsDesc: 'Demnächst verfügbar - Erweiterte Analysen und Ausgabeneinblicke',
    settingsDesc: 'Demnächst verfügbar - Kontoeinstellungen und Präferenzen',
  },
};

// Contexto
interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  availableLanguages: { code: Language; name: string; flag: string }[];
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Hook para usar el contexto
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

// Provider
interface LanguageProviderProps {
  children: ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [language, setLanguage] = useLocalStorage<Language>('financiera-language', 'es');

  const availableLanguages = [
    { code: 'es' as Language, name: 'Español', flag: '🇪🇸' },
    { code: 'en' as Language, name: 'English', flag: '🇺🇸' },
    { code: 'fr' as Language, name: 'Français', flag: '🇫🇷' },
    { code: 'de' as Language, name: 'Deutsch', flag: '🇩🇪' },
  ];

  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      value = value?.[k];
    }
    
    return value || key;
  };

  const value: LanguageContextType = {
    language,
    setLanguage,
    t,
    availableLanguages,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};
