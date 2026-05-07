import { Loader2, Check, AlertCircle } from 'lucide-react';

interface StatusBannerProps {
  step: string;
  label: string;
  isDone: boolean;
  color: string;
  error: string | null;
}

export function StatusBanner({ step, label, isDone, color, error }: StatusBannerProps) {
  const isVisible = ['cancelling', 'approving', 'listing'].includes(step) || isDone || step === 'error';
  if (!isVisible && !error) return null;

  return (
    <>
      {isVisible && (
        <div className={`rounded-xl p-3 flex items-center gap-3 ${
          color === 'red'   ? 'bg-red-500/10 ring-1 ring-red-500/20' :
          color === 'green' ? 'bg-green-500/10 ring-1 ring-green-500/20' :
                              'bg-purple-500/10 ring-1 ring-purple-500/20'
        }`}>
          {['cancelling', 'approving', 'listing'].includes(step) && (
            <Loader2 className="w-4 h-4 text-purple-400 animate-spin flex-shrink-0" />
          )}
          {isDone && <Check className="w-4 h-4 text-green-400 flex-shrink-0" />}
          {color === 'red' && <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />}
          <span className={`text-sm ${
            color === 'red'   ? 'text-red-400' :
            color === 'green' ? 'text-green-400' :
                                'text-purple-300'
          }`}>
            {label}
          </span>
        </div>
      )}
      {error && color === 'red' && (
        <p className="text-red-400 text-xs px-1">{error}</p>
      )}
    </>
  );
}
