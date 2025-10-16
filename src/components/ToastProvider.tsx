import React from 'react';
import { Toaster, toast } from 'react-hot-toast';
import { useTheme } from '../contexts/ThemeContext';

export const ToastProvider: React.FC = () => {
  const { resolvedTheme } = useTheme();

  return (
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 4000,
        style: {
          background: resolvedTheme === 'dark' ? '#1A1F1D' : '#FFFFFF',
          color: resolvedTheme === 'dark' ? '#E8E8E8' : '#1A1A1A',
          border: `1px solid ${resolvedTheme === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)'}`,
          borderRadius: '12px',
          backdropFilter: 'blur(16px)',
          fontSize: '14px',
          fontWeight: '500',
          padding: '12px 16px',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)',
        },
        success: {
          iconTheme: {
            primary: '#65A30D',
            secondary: resolvedTheme === 'dark' ? '#1A1F1D' : '#FFFFFF',
          },
        },
        error: {
          iconTheme: {
            primary: '#EF4444',
            secondary: resolvedTheme === 'dark' ? '#1A1F1D' : '#FFFFFF',
          },
        },
        loading: {
          iconTheme: {
            primary: '#65A30D',
            secondary: resolvedTheme === 'dark' ? '#1A1F1D' : '#FFFFFF',
          },
        },
      }}
    />
  );
};

// Hook personalizado para notificaciones
export const useToast = () => {
  const showSuccess = (message: string) => {
    return toast.success(message, {
      icon: '✅',
    });
  };

  const showError = (message: string) => {
    return toast.error(message, {
      icon: '❌',
    });
  };

  const showLoading = (message: string) => {
    return toast.loading(message, {
      icon: '⏳',
    });
  };

  const showInfo = (message: string) => {
    return toast(message, {
      icon: 'ℹ️',
    });
  };

  const showWarning = (message: string) => {
    return toast(message, {
      icon: '⚠️',
      style: {
        background: '#F59E0B',
        color: '#FFFFFF',
      },
    });
  };

  const dismiss = (toastId?: string) => {
    toast.dismiss(toastId);
  };

  const dismissAll = () => {
    toast.dismiss();
  };

  return {
    showSuccess,
    showError,
    showLoading,
    showInfo,
    showWarning,
    dismiss,
    dismissAll,
  };
};
