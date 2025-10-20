'use client';

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
    <div className="flex items-center justify-center mb-12">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => (
          <div key={step.number} className="flex items-center">
            <div className="flex items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold transition-all duration-300 ${
                  step.status === 'completed'
                    ? 'bg-green-600 text-white'
                    : step.status === 'current'
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-700 text-gray-400'
                }`}
              >
                {step.status === 'completed' ? (
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  step.number
                )}
              </div>
              <span className="ml-2 text-white font-medium hidden sm:inline">
                {step.label}
              </span>
            </div>

            {index < steps.length - 1 && (
              <div
                className={`w-12 h-0.5 mx-4 transition-all duration-300 ${
                  step.status === 'completed' ? 'bg-green-600' : 'bg-gray-700'
                }`}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
