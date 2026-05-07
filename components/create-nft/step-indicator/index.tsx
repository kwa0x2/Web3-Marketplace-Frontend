'use client';

import { Check } from 'lucide-react';

interface Step {
  number: number;
  label: string;
  status: 'completed' | 'current' | 'upcoming';
}

interface StepIndicatorProps {
  steps: Step[];
}

export function StepIndicator({ steps }: StepIndicatorProps) {
  return (
    <div className="flex items-center justify-center mb-10">
      {steps.map((step, index) => (
        <div key={step.number} className="flex items-center">
          <div className="flex items-center gap-2.5">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
              step.status === 'completed'
                ? 'bg-green-500 text-white'
                : step.status === 'current'
                ? 'bg-purple-600 text-white ring-4 ring-purple-600/20'
                : 'bg-white/[0.06] text-gray-600 ring-1 ring-white/[0.08]'
            }`}>
              {step.status === 'completed' ? <Check className="w-4 h-4" /> : step.number}
            </div>
            <span className={`text-sm font-medium hidden sm:block ${
              step.status === 'current' ? 'text-white' :
              step.status === 'completed' ? 'text-green-400' : 'text-gray-600'
            }`}>
              {step.label}
            </span>
          </div>

          {index < steps.length - 1 && (
            <div className={`w-16 h-px mx-4 transition-all duration-300 ${
              step.status === 'completed' ? 'bg-green-500/50' : 'bg-white/[0.08]'
            }`} />
          )}
        </div>
      ))}
    </div>
  );
}
