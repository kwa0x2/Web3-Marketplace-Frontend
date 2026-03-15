import { ChevronDown, ChevronUp } from 'lucide-react';

interface Property {
  trait_type: string;
  value: string;
}

interface AdvancedSettingsProps {
  showAdvanced: boolean;
  onToggle: () => void;
  properties: Property[];
  onAddProperty: () => void;
  onUpdateProperty: (index: number, field: 'trait_type' | 'value', value: string) => void;
  onRemoveProperty: (index: number) => void;
}

export function AdvancedSettings({
  showAdvanced,
  onToggle,
  properties,
  onAddProperty,
  onUpdateProperty,
  onRemoveProperty,
}: AdvancedSettingsProps) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 font-semibold text-sm transition-colors"
      >
        {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        <span>{showAdvanced ? 'Hide' : 'Show'} advanced settings</span>
      </button>

      {showAdvanced && (
        <div className="mt-4 space-y-4 bg-gray-800/30 rounded-xl p-6 border border-gray-700">
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="block text-white font-semibold">Properties</label>
              <button
                type="button"
                onClick={onAddProperty}
                className="text-purple-400 hover:text-purple-300 text-sm font-semibold transition-colors"
              >
                + Add Property
              </button>
            </div>
            <div className="space-y-3">
              {properties.map((prop, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={prop.trait_type}
                    onChange={(e) => onUpdateProperty(index, 'trait_type', e.target.value)}
                    placeholder="e.g., Size"
                    className="flex-1 px-3 py-2 rounded-lg bg-gray-900/60 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-900/80 transition-all text-sm"
                  />
                  <input
                    type="text"
                    value={prop.value}
                    onChange={(e) => onUpdateProperty(index, 'value', e.target.value)}
                    placeholder="e.g., M"
                    className="flex-1 px-3 py-2 rounded-lg bg-gray-900/60 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-900/80 transition-all text-sm"
                  />
                  <button
                    type="button"
                    onClick={() => onRemoveProperty(index)}
                    className="p-2 text-red-400 hover:text-red-300 transition-colors"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
              {properties.length === 0 && (
                <p className="text-gray-500 text-sm text-center py-4">No properties added yet</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
