import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { Send, User, MapPin, CreditCard, AlertCircle, CheckCircle } from 'lucide-react';
import { useAppData } from '../contexts/AppDataContext';
import { useToast } from './ToastProvider';
import { useLanguage } from '../contexts/LanguageContext';

interface TransferFormData {
  recipientName: string;
  recipientEmail: string;
  recipientPhone: string;
  recipientCountry: string;
  recipientBank: string;
  recipientAccount: string;
  amount: number;
  currency: string;
  purpose: string;
  notes: string;
}

const countries = [
  { code: 'US', name: 'Estados Unidos', flag: '🇺🇸' },
  { code: 'ES', name: 'España', flag: '🇪🇸' },
  { code: 'GB', name: 'Reino Unido', flag: '🇬🇧' },
  { code: 'FR', name: 'Francia', flag: '🇫🇷' },
  { code: 'DE', name: 'Alemania', flag: '🇩🇪' },
  { code: 'IT', name: 'Italia', flag: '🇮🇹' },
  { code: 'CA', name: 'Canadá', flag: '🇨🇦' },
  { code: 'AU', name: 'Australia', flag: '🇦🇺' },
  { code: 'JP', name: 'Japón', flag: '🇯🇵' },
  { code: 'BR', name: 'Brasil', flag: '🇧🇷' },
];

const currencies = [
  { code: 'USD', symbol: '$', name: 'Dólar Estadounidense' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'Libra Esterlina' },
  { code: 'JPY', symbol: '¥', name: 'Yen Japonés' },
];

export const TransferForm: React.FC = () => {
  const { t } = useLanguage();
  const { addTransaction, currencies: userCurrencies } = useAppData();
  const { showSuccess, showError } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [step, setStep] = useState(1);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<TransferFormData>({
    defaultValues: {
      currency: 'USD',
      recipientCountry: 'US',
    },
  });

  const watchedAmount = watch('amount');
  const watchedCurrency = watch('currency');

  const onSubmit = async (data: TransferFormData) => {
    setIsSubmitting(true);
    
    try {
      // Simular procesamiento de transferencia
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Agregar la transacción
      addTransaction({
        type: 'sent',
        amount: -data.amount,
        currency: data.currency,
        recipient: data.recipientName,
        location: `${data.recipientCountry}`,
        flag: countries.find(c => c.code === data.recipientCountry)?.flag || '🌍',
        category: 'Transfer',
        icon: 'Send',
        time: 'Just now',
        description: data.purpose,
        date: new Date().toISOString(),
      });

      showSuccess('Transferencia enviada exitosamente');
      reset();
      setStep(1);
    } catch (error) {
      showError('Error al procesar la transferencia');
    } finally {
      setIsSubmitting(false);
    }
  };

  const nextStep = () => {
    if (step < 3) setStep(step + 1);
  };

  const prevStep = () => {
    if (step > 1) setStep(step - 1);
  };

  const selectedCountry = countries.find(c => c.code === watch('recipientCountry'));

  return (
    <div className="max-w-2xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-light-surface/50 dark:bg-dark-surface/50 backdrop-blur-sm border border-light-border dark:border-dark-border rounded-2xl p-8 shadow-glass"
      >
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-light-text dark:text-dark-text font-editorial mb-2">
            Transferencia Internacional
          </h2>
          <p className="text-light-text-secondary dark:text-dark-text-secondary">
            Envía dinero de forma segura a cualquier parte del mundo
          </p>
        </div>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-medium transition-colors duration-300 ${
                  step >= stepNumber
                    ? 'bg-lime-accent text-light-base dark:text-dark-base'
                    : 'bg-light-glass dark:bg-dark-glass text-light-text-secondary dark:text-dark-text-secondary'
                }`}
              >
                {step > stepNumber ? (
                  <CheckCircle className="w-5 h-5" />
                ) : (
                  stepNumber
                )}
              </div>
              {stepNumber < 3 && (
                <div
                  className={`w-16 h-1 mx-2 transition-colors duration-300 ${
                    step > stepNumber ? 'bg-lime-accent' : 'bg-light-glass dark:bg-dark-glass'
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Step 1: Recipient Information */}
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial mb-4">
                Información del Destinatario
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                    Nombre Completo *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                    <input
                      {...register('recipientName', { 
                        required: 'El nombre es requerido',
                        minLength: { value: 2, message: 'Mínimo 2 caracteres' }
                      })}
                      className="w-full pl-10 pr-4 py-3 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50 transition-colors duration-300"
                      placeholder="Juan Pérez"
                    />
                  </div>
                  {errors.recipientName && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-1 flex items-center"
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.recipientName.message}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                    Email *
                  </label>
                  <input
                    {...register('recipientEmail', { 
                      required: 'El email es requerido',
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: 'Email inválido'
                      }
                    })}
                    type="email"
                    className="w-full px-4 py-3 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50 transition-colors duration-300"
                    placeholder="juan@email.com"
                  />
                  {errors.recipientEmail && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-1 flex items-center"
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.recipientEmail.message}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                    Teléfono
                  </label>
                  <input
                    {...register('recipientPhone')}
                    type="tel"
                    className="w-full px-4 py-3 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50 transition-colors duration-300"
                    placeholder="+1 234 567 8900"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                    País *
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                    <select
                      {...register('recipientCountry', { required: 'El país es requerido' })}
                      className="w-full pl-10 pr-4 py-3 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50 transition-colors duration-300 appearance-none"
                    >
                      {countries.map((country) => (
                        <option key={country.code} value={country.code}>
                          {country.flag} {country.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <motion.button
                  type="button"
                  onClick={nextStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-lime-accent text-light-base dark:text-dark-base px-6 py-3 rounded-xl font-medium hover:shadow-glow transition-all"
                >
                  Continuar
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Bank Information */}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial mb-4">
                Información Bancaria
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                    Banco *
                  </label>
                  <div className="relative">
                    <CreditCard className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-light-text-secondary dark:text-dark-text-secondary" />
                    <input
                      {...register('recipientBank', { required: 'El banco es requerido' })}
                      className="w-full pl-10 pr-4 py-3 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50 transition-colors duration-300"
                      placeholder="Banco Nacional"
                    />
                  </div>
                  {errors.recipientBank && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-1 flex items-center"
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.recipientBank.message}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                    Número de Cuenta *
                  </label>
                  <input
                    {...register('recipientAccount', { 
                      required: 'El número de cuenta es requerido',
                      minLength: { value: 8, message: 'Mínimo 8 caracteres' }
                    })}
                    className="w-full px-4 py-3 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50 transition-colors duration-300"
                    placeholder="1234567890"
                  />
                  {errors.recipientAccount && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-1 flex items-center"
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.recipientAccount.message}
                    </motion.p>
                  )}
                </div>
              </div>

              <div className="flex justify-between">
                <motion.button
                  type="button"
                  onClick={prevStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border text-light-text dark:text-dark-text px-6 py-3 rounded-xl font-medium hover:border-lime-accent/30 hover:text-lime-accent transition-all"
                >
                  Anterior
                </motion.button>
                <motion.button
                  type="button"
                  onClick={nextStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-lime-accent text-light-base dark:text-dark-base px-6 py-3 rounded-xl font-medium hover:shadow-glow transition-all"
                >
                  Continuar
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Transfer Details */}
          {step === 3 && (
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h3 className="text-xl font-bold text-light-text dark:text-dark-text font-editorial mb-4">
                Detalles de la Transferencia
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                    Monto *
                  </label>
                  <div className="relative">
                    <input
                      {...register('amount', { 
                        required: 'El monto es requerido',
                        min: { value: 1, message: 'Mínimo $1' },
                        max: { value: 100000, message: 'Máximo $100,000' }
                      })}
                      type="number"
                      step="0.01"
                      className="w-full pr-16 pl-4 py-3 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50 transition-colors duration-300"
                      placeholder="1000.00"
                    />
                    <select
                      {...register('currency')}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-transparent border-none text-light-text dark:text-dark-text focus:outline-none"
                    >
                      {currencies.map((currency) => (
                        <option key={currency.code} value={currency.code}>
                          {currency.symbol}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.amount && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-1 flex items-center"
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.amount.message}
                    </motion.p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                    Propósito *
                  </label>
                  <select
                    {...register('purpose', { required: 'El propósito es requerido' })}
                    className="w-full px-4 py-3 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50 transition-colors duration-300"
                  >
                    <option value="">Seleccionar propósito</option>
                    <option value="Family Support">Apoyo Familiar</option>
                    <option value="Business Payment">Pago de Negocio</option>
                    <option value="Education">Educación</option>
                    <option value="Medical">Médico</option>
                    <option value="Other">Otro</option>
                  </select>
                  {errors.purpose && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-400 text-sm mt-1 flex items-center"
                    >
                      <AlertCircle className="w-4 h-4 mr-1" />
                      {errors.purpose.message}
                    </motion.p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-light-text dark:text-dark-text mb-2">
                  Notas (Opcional)
                </label>
                <textarea
                  {...register('notes')}
                  rows={3}
                  className="w-full px-4 py-3 bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl text-light-text dark:text-dark-text focus:outline-none focus:border-lime-accent/50 transition-colors duration-300 resize-none"
                  placeholder="Información adicional sobre la transferencia..."
                />
              </div>

              {/* Transfer Summary */}
              {watchedAmount && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border rounded-xl p-4"
                >
                  <h4 className="font-medium text-light-text dark:text-dark-text mb-2">
                    Resumen de la Transferencia
                  </h4>
                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-light-text-secondary dark:text-dark-text-secondary">Destinatario:</span>
                      <span className="text-light-text dark:text-dark-text">{watch('recipientName')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-light-text-secondary dark:text-dark-text-secondary">País:</span>
                      <span className="text-light-text dark:text-dark-text">
                        {selectedCountry?.flag} {selectedCountry?.name}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-light-text-secondary dark:text-dark-text-secondary">Monto:</span>
                      <span className="text-light-text dark:text-dark-text font-medium">
                        {currencies.find(c => c.code === watchedCurrency)?.symbol}
                        {watchedAmount?.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between border-t border-light-border dark:border-dark-border pt-2 mt-2">
                      <span className="text-light-text-secondary dark:text-dark-text-secondary">Comisión:</span>
                      <span className="text-light-text dark:text-dark-text">$5.00</span>
                    </div>
                    <div className="flex justify-between font-medium">
                      <span className="text-light-text dark:text-dark-text">Total:</span>
                      <span className="text-lime-accent">
                        {currencies.find(c => c.code === watchedCurrency)?.symbol}
                        {(Number(watchedAmount) + 5).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </motion.div>
              )}

              <div className="flex justify-between">
                <motion.button
                  type="button"
                  onClick={prevStep}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border text-light-text dark:text-dark-text px-6 py-3 rounded-xl font-medium hover:border-lime-accent/30 hover:text-lime-accent transition-all"
                >
                  Anterior
                </motion.button>
                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
                  whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
                  className="bg-lime-accent text-light-base dark:text-dark-base px-6 py-3 rounded-xl font-medium hover:shadow-glow transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2"
                >
                  {isSubmitting ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 border-2 border-light-base dark:border-dark-base border-t-transparent rounded-full"
                      />
                      <span>Enviando...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Enviar Transferencia</span>
                    </>
                  )}
                </motion.button>
              </div>
            </motion.div>
          )}
        </form>
      </motion.div>
    </div>
  );
};
