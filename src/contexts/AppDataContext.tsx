import React, { createContext, useContext, ReactNode } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';

// Tipos para los datos de la aplicación
export interface Currency {
  code: string;
  symbol: string;
  balance: number;
  change: number;
  flag: string;
}

export interface Transaction {
  id: number;
  type: 'sent' | 'received';
  amount: number;
  currency: string;
  recipient: string;
  location: string;
  flag: string;
  category: string;
  icon: string;
  time: string;
  description: string;
  date: string;
}

export interface ExchangeRate {
  pair: string;
  rate: number;
  change: number;
  changePercent: number;
  high: number;
  low: number;
  bankRate: number;
  spread: number;
}

export interface UserPreferences {
  showBalances: boolean;
  defaultCurrency: string;
  notifications: boolean;
  language: string;
}

// Datos iniciales
const initialCurrencies: Currency[] = [
  { code: 'USD', symbol: '$', balance: 12847.32, change: +2.34, flag: '🇺🇸' },
  { code: 'EUR', symbol: '€', balance: 8923.41, change: -1.12, flag: '🇪🇺' },
  { code: 'GBP', symbol: '£', balance: 6432.18, change: +0.89, flag: '🇬🇧' },
  { code: 'JPY', symbol: '¥', balance: 1234567, change: -0.45, flag: '🇯🇵' },
];

const initialTransactions: Transaction[] = [
  {
    id: 1,
    type: 'sent',
    amount: -2500,
    currency: 'USD',
    recipient: 'Sarah Johnson',
    location: 'New York, US',
    flag: '🇺🇸',
    category: 'Business',
    icon: 'Briefcase',
    time: '2 hours ago',
    description: 'Consulting payment',
    date: new Date().toISOString(),
  },
  {
    id: 2,
    type: 'received',
    amount: +1840,
    currency: 'EUR',
    recipient: 'Freelance Client',
    location: 'Berlin, DE',
    flag: '🇩🇪',
    category: 'Income',
    icon: 'ArrowDownLeft',
    time: '5 hours ago',
    description: 'Web development project',
    date: new Date().toISOString(),
  },
  {
    id: 3,
    type: 'sent',
    amount: -89.99,
    currency: 'GBP',
    recipient: 'British Airways',
    location: 'London, UK',
    flag: '🇬🇧',
    category: 'Travel',
    icon: 'Plane',
    time: '1 day ago',
    description: 'Flight booking',
    date: new Date().toISOString(),
  },
  {
    id: 4,
    type: 'sent',
    amount: -45.20,
    currency: 'USD',
    recipient: 'Amazon',
    location: 'Seattle, US',
    flag: '🇺🇸',
    category: 'Shopping',
    icon: 'ShoppingBag',
    time: '2 days ago',
    description: 'Office supplies',
    date: new Date().toISOString(),
  },
  {
    id: 5,
    type: 'sent',
    amount: -12.50,
    currency: 'USD',
    recipient: 'Starbucks Coffee',
    location: 'San Francisco, US',
    flag: '🇺🇸',
    category: 'Food',
    icon: 'Coffee',
    time: '3 days ago',
    description: 'Coffee & pastries',
    date: new Date().toISOString(),
  },
];

const initialExchangeRates: ExchangeRate[] = [
  { 
    pair: 'EUR/USD', 
    rate: 1.0892, 
    change: +0.0023, 
    changePercent: +0.21,
    high: 1.0895,
    low: 1.0871,
    bankRate: 1.0850,
    spread: 0.0042
  },
  { 
    pair: 'GBP/USD', 
    rate: 1.2634, 
    change: -0.0018, 
    changePercent: -0.14,
    high: 1.2651,
    low: 1.2618,
    bankRate: 1.2590,
    spread: 0.0044
  },
  { 
    pair: 'USD/JPY', 
    rate: 149.82, 
    change: +0.45, 
    changePercent: +0.30,
    high: 149.95,
    low: 149.21,
    bankRate: 149.20,
    spread: 0.62
  },
  { 
    pair: 'EUR/GBP', 
    rate: 0.8621, 
    change: +0.0008, 
    changePercent: +0.09,
    high: 0.8628,
    low: 0.8615,
    bankRate: 0.8605,
    spread: 0.0016
  },
];

const initialPreferences: UserPreferences = {
  showBalances: true,
  defaultCurrency: 'USD',
  notifications: true,
  language: 'es',
};

// Contexto
interface AppDataContextType {
  currencies: Currency[];
  setCurrencies: (currencies: Currency[] | ((prev: Currency[]) => Currency[])) => void;
  transactions: Transaction[];
  setTransactions: (transactions: Transaction[] | ((prev: Transaction[]) => Transaction[])) => void;
  exchangeRates: ExchangeRate[];
  setExchangeRates: (rates: ExchangeRate[] | ((prev: ExchangeRate[]) => ExchangeRate[])) => void;
  preferences: UserPreferences;
  setPreferences: (preferences: UserPreferences | ((prev: UserPreferences) => UserPreferences)) => void;
  addTransaction: (transaction: Omit<Transaction, 'id'>) => void;
  updateCurrency: (code: string, updates: Partial<Currency>) => void;
  getTotalPortfolioValue: () => number;
}

const AppDataContext = createContext<AppDataContextType | undefined>(undefined);

// Hook para usar el contexto
export const useAppData = () => {
  const context = useContext(AppDataContext);
  if (context === undefined) {
    throw new Error('useAppData must be used within an AppDataProvider');
  }
  return context;
};

// Provider
interface AppDataProviderProps {
  children: ReactNode;
}

export const AppDataProvider: React.FC<AppDataProviderProps> = ({ children }) => {
  const [currencies, setCurrencies] = useLocalStorage<Currency[]>('financiera-currencies', initialCurrencies);
  const [transactions, setTransactions] = useLocalStorage<Transaction[]>('financiera-transactions', initialTransactions);
  const [exchangeRates, setExchangeRates] = useLocalStorage<ExchangeRate[]>('financiera-exchange-rates', initialExchangeRates);
  const [preferences, setPreferences] = useLocalStorage<UserPreferences>('financiera-preferences', initialPreferences);

  // Función para agregar una nueva transacción
  const addTransaction = (transaction: Omit<Transaction, 'id'>) => {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now(), // ID único basado en timestamp
    };
    setTransactions(prev => [newTransaction, ...prev]);
  };

  // Función para actualizar una moneda
  const updateCurrency = (code: string, updates: Partial<Currency>) => {
    setCurrencies(prev => 
      prev.map(currency => 
        currency.code === code ? { ...currency, ...updates } : currency
      )
    );
  };

  // Función para calcular el valor total del portafolio
  const getTotalPortfolioValue = () => {
    return currencies.reduce((total, currency) => {
      // Convertir a USD (simplificado - en una app real usarías tasas de cambio reales)
      const usdRate = currency.code === 'USD' ? 1 : 
                     currency.code === 'EUR' ? 1.08 :
                     currency.code === 'GBP' ? 1.26 :
                     currency.code === 'JPY' ? 0.0067 : 1;
      return total + (currency.balance * usdRate);
    }, 0);
  };

  const value: AppDataContextType = {
    currencies,
    setCurrencies,
    transactions,
    setTransactions,
    exchangeRates,
    setExchangeRates,
    preferences,
    setPreferences,
    addTransaction,
    updateCurrency,
    getTotalPortfolioValue,
  };

  return (
    <AppDataContext.Provider value={value}>
      {children}
    </AppDataContext.Provider>
  );
};
