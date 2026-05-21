"use client";

import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { X, CheckCircle, AlertCircle, Info, Terminal } from 'lucide-react';

export interface Toast {
  id: string;
  type: 'success' | 'error' | 'info';
  message: string;
  title?: string;
}

const ToastContext = React.createContext<{
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
} | null>(null);

export function useToast() {
  const context = React.useContext(ToastContext);
  if (!context) throw new Error('useToast must be used within ToastProvider');
  return context;
}

export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { ...toast, id }]);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  return (
    <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
      {children}
      <Toaster toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

function Toaster({
  toasts,
  onRemove,
}: {
  toasts: Toast[];
  onRemove: (id: string) => void;
}) {
  return (
    <div className="fixed top-5 right-5 z-[9999] space-y-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  );
}

function ToastItem({
  toast,
  onRemove,
}: {
  toast: Toast;
  onRemove: (id: string) => void;
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    const autoHide = setTimeout(() => onRemove(toast.id), 5000);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(autoHide);
    };
  }, [toast.id, onRemove]);

  const iconMap = {
    success: CheckCircle,
    error: AlertCircle,
    info: Info,
  };

  const colorMap = {
    success: 'accent',
    error: 'warning',
    info: 'primary',
  };

  const Icon = iconMap[toast.type];
  const colors = colorMap[toast.type];

  return (
    <motion.div
      initial={{ opacity: 0, x: 100, scale: 0.9 }}
      animate={{ opacity: mounted ? 1 : 0, x: mounted ? 0 : 100, scale: 1 }}
      exit={{ opacity: 0, x: 100, scale: 0.9 }}
      className={`
        pointer-events-auto p-4 rounded-xl glass border border-white/10 
        backdrop-blur-md min-w-[300px] max-w-[400px] shadow-xl
      `}
      whileHover={{ scale: 1.02 }}
    >
      <div className="flex items-start gap-3">
        <Icon
          className={`w-6 h-6 mt-0.5 text-${colors} shrink-0`}
          style={{ filter: `drop-shadow(0 0 8px var(--${colors}))` }}
        />
        <div className="flex-1">
          {toast.title && (
            <p className={`font-heading font-semibold text-${colors} mb-1`}>
              {toast.title}
            </p>
          )}
          <p className="text-white text-sm font-mono">{toast.message}</p>
        </div>
        <button
          onClick={() => onRemove(toast.id)}
          className="p-1 rounded-md hover:bg-white/10 transition-colors"
        >
          <X className="w-4 h-4 text-muted" />
        </button>
      </div>
    </motion.div>
  );
}

// Helper component for global toast access
export function withToast(Component: React.ComponentType) {
  return function WithToastWrapper(props: any) {
    const { addToast } = useToast();
    return <Component {...props} toast={addToast} />;
  };
}
