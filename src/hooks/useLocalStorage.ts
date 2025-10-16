import { useState, useEffect } from 'react';

/**
 * Hook personalizado para manejar localStorage con sincronización automática
 * y soporte para valores complejos (objetos, arrays)
 */
export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((val: T) => T)) => void] {
  // Estado para almacenar el valor
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      // Obtener del localStorage
      const item = window.localStorage.getItem(key);
      // Parsear el JSON o devolver el valor inicial
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      // Si hay error, devolver el valor inicial
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });

  // Función para actualizar el valor
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Permitir que el valor sea una función para tener la misma API que useState
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      // Guardar en el estado
      setStoredValue(valueToStore);
      
      // Guardar en localStorage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
      
      // Disparar evento personalizado para sincronización entre tabs
      window.dispatchEvent(new CustomEvent('localStorage', { 
        detail: { key, value: valueToStore } 
      }));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  // Escuchar cambios en localStorage desde otras tabs
  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === key && e.newValue !== null) {
        try {
          setStoredValue(JSON.parse(e.newValue));
        } catch (error) {
          console.error(`Error parsing localStorage value for key "${key}":`, error);
        }
      }
    };

    // Escuchar evento personalizado para sincronización
    const handleCustomStorageChange = (e: CustomEvent) => {
      if (e.detail.key === key) {
        setStoredValue(e.detail.value);
      }
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('localStorage', handleCustomStorageChange as EventListener);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('localStorage', handleCustomStorageChange as EventListener);
    };
  }, [key]);

  return [storedValue, setValue];
}
