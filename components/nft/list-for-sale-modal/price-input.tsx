import { Eth } from '@/components/icons/eth';

const PRESETS = ['0.01', '0.05', '0.1', '0.5', '1'];

interface PriceInputProps {
  price: string;
  onChange: (value: string) => void;
  disabled: boolean;
}

export function PriceInput({ price, onChange, disabled }: PriceInputProps) {
  return (
    <div className="bg-white/[0.02] ring-1 ring-white/[0.06] rounded-2xl p-4">
      <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Set Price</p>
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
          <Eth className="w-4 h-4 text-purple-400" />
        </div>
        <input
          type="number"
          step="0.001"
          min="0"
          placeholder="0.00"
          value={price}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          className="flex-1 bg-transparent text-white text-2xl font-bold placeholder:text-gray-700 focus:outline-none disabled:opacity-50 min-w-0"
        />
        <span className="text-gray-500 text-sm font-medium flex-shrink-0">ETH</span>
      </div>

      <div className="flex gap-2 mt-3">
        {PRESETS.map((preset) => (
          <button
            key={preset}
            type="button"
            onClick={() => onChange(preset)}
            disabled={disabled}
            className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-40 ${
              price === preset
                ? 'bg-purple-600 text-white'
                : 'bg-white/[0.04] text-gray-500 hover:bg-white/[0.08] hover:text-gray-300'
            }`}
          >
            {preset}
          </button>
        ))}
      </div>
    </div>
  );
}
