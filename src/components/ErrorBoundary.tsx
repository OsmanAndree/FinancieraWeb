import React, { Component, ErrorInfo, ReactNode } from 'react';
import { motion } from 'framer-motion';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Actualizar el estado para mostrar la UI de error
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log del error
    console.error('Error capturado por ErrorBoundary:', error, errorInfo);
    
    this.setState({
      error,
      errorInfo,
    });

    // Aquí podrías enviar el error a un servicio de monitoreo
    // como Sentry, LogRocket, etc.
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  handleReload = () => {
    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      // UI de error personalizada
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-light-base dark:bg-dark-base flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="max-w-md w-full bg-light-surface/80 dark:bg-dark-surface/80 backdrop-blur-glass border border-light-border dark:border-dark-border rounded-2xl p-8 text-center shadow-glass"
          >
            {/* Icono de error */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2, type: "spring" }}
              className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6"
            >
              <AlertTriangle className="w-8 h-8 text-red-400" />
            </motion.div>

            {/* Título */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-2xl font-bold text-light-text dark:text-dark-text font-editorial mb-4"
            >
              ¡Ups! Algo salió mal
            </motion.h1>

            {/* Descripción */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-light-text-secondary dark:text-dark-text-secondary mb-8"
            >
              Ha ocurrido un error inesperado. No te preocupes, tus datos están seguros.
            </motion.p>

            {/* Detalles del error (solo en desarrollo) */}
            {process.env.NODE_ENV === 'development' && this.state.error && (
              <motion.details
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mb-6 text-left"
              >
                <summary className="cursor-pointer text-sm text-light-text-secondary dark:text-dark-text-secondary mb-2">
                  Detalles del error (desarrollo)
                </summary>
                <div className="bg-light-glass dark:bg-dark-glass rounded-lg p-4 text-xs font-mono text-light-text dark:text-dark-text overflow-auto max-h-32">
                  <div className="text-red-400 mb-2">
                    <strong>Error:</strong> {this.state.error.message}
                  </div>
                  {this.state.errorInfo && (
                    <div className="text-light-text-secondary dark:text-dark-text-secondary">
                      <strong>Stack:</strong>
                      <pre className="whitespace-pre-wrap mt-1">
                        {this.state.errorInfo.componentStack}
                      </pre>
                    </div>
                  )}
                </div>
              </motion.details>
            )}

            {/* Botones de acción */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="space-y-3"
            >
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={this.handleReset}
                className="w-full bg-lime-accent text-light-base dark:text-dark-base px-6 py-3 rounded-xl font-medium hover:shadow-glow transition-all flex items-center justify-center space-x-2"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Intentar de nuevo</span>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={this.handleReload}
                className="w-full bg-light-glass dark:bg-dark-glass border border-light-border dark:border-dark-border text-light-text dark:text-dark-text px-6 py-3 rounded-xl font-medium hover:border-lime-accent/30 hover:text-lime-accent transition-all flex items-center justify-center space-x-2"
              >
                <Home className="w-4 h-4" />
                <span>Recargar página</span>
              </motion.button>
            </motion.div>

            {/* Información adicional */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="text-xs text-light-text-secondary dark:text-dark-text-secondary mt-6"
            >
              Si el problema persiste, contacta al soporte técnico.
            </motion.p>
          </motion.div>
        </div>
      );
    }

    return this.props.children;
  }
}

// Hook para usar el ErrorBoundary de forma más fácil
export const useErrorHandler = () => {
  const handleError = (error: Error, errorInfo?: ErrorInfo) => {
    console.error('Error manejado:', error, errorInfo);
    
    // Aquí podrías enviar el error a un servicio de monitoreo
    // o mostrar una notificación al usuario
  };

  return { handleError };
};
