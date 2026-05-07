import { Check, Loader2 } from 'lucide-react';

interface StepIndicatorProps {
  step: string;
  error: string | null;
}

const STEPS = [
  { key: 'approving', label: 'Approve' },
  { key: 'listing',   label: 'List' },
];

export function StepIndicator({ step, error }: StepIndicatorProps) {
  const isVisible = ['approving', 'listing', 'done', 'error'].includes(step);
  if (!isVisible) return null;

  return (
    <>
      <div className="flex items-center gap-2">
        {STEPS.map((s, i) => {
          const isActive = step === s.key;
          const isDoneStep =
            (s.key === 'approving' && ['listing', 'done'].includes(step)) ||
            (s.key === 'listing'   && step === 'done');

          return (
            <div key={s.key} className="flex items-center gap-2 flex-1">
              <div className={`flex items-center gap-2 flex-1 py-2.5 px-3 rounded-xl ring-1 transition-all ${
                isDoneStep      ? 'bg-green-500/10 ring-green-500/20' :
                isActive        ? 'bg-purple-500/10 ring-purple-500/30' :
                step === 'error'? 'bg-red-500/10 ring-red-500/20' :
                                  'bg-white/[0.02] ring-white/[0.06]'
              }`}>
                <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                  isDoneStep      ? 'bg-green-500' :
                  isActive        ? 'bg-purple-500' :
                  step === 'error'? 'bg-red-500/30' :
                                    'bg-white/[0.06]'
                }`}>
                  {isDoneStep ? (
                    <Check className="w-3 h-3 text-white" />
                  ) : isActive ? (
                    <Loader2 className="w-3 h-3 text-white animate-spin" />
                  ) : (
                    <span className="text-[10px] text-gray-600 font-bold">{i + 1}</span>
                  )}
                </div>
                <span className={`text-xs font-medium ${
                  isDoneStep ? 'text-green-400' :
                  isActive   ? 'text-purple-300' :
                               'text-gray-600'
                }`}>{s.label}</span>
              </div>
              {i === 0 && (
                <div className={`w-4 h-px flex-shrink-0 ${
                  ['listing', 'done'].includes(step) ? 'bg-green-500/40' : 'bg-white/[0.06]'
                }`} />
              )}
            </div>
          );
        })}
      </div>
      {step === 'error' && error && (
        <p className="text-red-400 text-xs px-1">{error}</p>
      )}
    </>
  );
}
