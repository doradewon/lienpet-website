import { useStore } from '@/store/useStore';
import { CheckCircle, XCircle, Info } from 'lucide-react';

export default function ToastContainer() {
  const { toasts } = useStore();

  const iconMap = {
    success: <CheckCircle className="w-4 h-4 text-brand" />,
    error: <XCircle className="w-4 h-4 text-destructive" />,
    info: <Info className="w-4 h-4 text-primary" />,
  };

  if (toasts.length === 0) return null;

  return (
    <div className="fixed top-20 right-4 z-[100] flex flex-col gap-2">
      {toasts.map(toast => (
        <div
          key={toast.id}
          className="bg-card border rounded-lg p-3 pr-8 shadow-hover animate-slide-in-right flex items-center gap-2 min-w-[240px]"
        >
          {iconMap[toast.type]}
          <span className="text-sm text-foreground">{toast.message}</span>
        </div>
      ))}
    </div>
  );
}