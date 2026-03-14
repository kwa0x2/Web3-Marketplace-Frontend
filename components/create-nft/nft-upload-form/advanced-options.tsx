import { NFTFormData } from './types';

interface AdvancedOptionsProps {
  showAdvanced: boolean;
  onToggle: () => void;
  formData: NFTFormData;
  onFormChange: (data: NFTFormData) => void;
  onAddProperty: () => void;
  onUpdateProperty: (index: number, field: 'trait_type' | 'value', value: string) => void;
  onRemoveProperty: (index: number) => void;
}

export function AdvancedOptions({
  showAdvanced,
  onToggle,
  formData,
  onFormChange,
  onAddProperty,
  onUpdateProperty,
  onRemoveProperty,
}: AdvancedOptionsProps) {
  return (
    <>
      <div>
        <button
          type="button"
          onClick={onToggle}
          className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
        >
          <span className="font-semibold">Advanced Options</span>
          <svg
            className={`w-5 h-5 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {showAdvanced && (
        <div className="space-y-6 bg-gray-800/30 rounded-xl p-6 border border-gray-700">
          <div>
            <label className="block text-white font-semibold mb-2">
              Properties (Optional)
            </label>
            <div className="space-y-3">
              {formData.properties.map((prop, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={prop.trait_type}
                    onChange={(e) => onUpdateProperty(index, 'trait_type', e.target.value)}
                    placeholder="e.g., Background"
                    className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-sm"
                  />
                  <input
                    type="text"
                    value={prop.value}
                    onChange={(e) => onUpdateProperty(index, 'value', e.target.value)}
                    placeholder="e.g., Blue"
                    className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-sm"
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
              <button
                type="button"
                onClick={onAddProperty}
                className="text-purple-400 hover:text-purple-300 text-sm font-semibold transition-colors"
              >
                + Add Property
              </button>
            </div>
          </div>

          <div>
            <label className="block text-white font-semibold mb-2">
              Unlockable Content (Optional)
            </label>
            <textarea
              value={formData.unlockableContent}
              onChange={(e) => onFormChange({ ...formData, unlockableContent: e.target.value })}
              placeholder="Content that will be revealed to the buyer (e.g., access codes, links)"
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
            />
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="explicitContent"
              checked={formData.explicitContent}
              onChange={(e) => onFormChange({ ...formData, explicitContent: e.target.checked })}
              className="w-5 h-5 rounded border-gray-700 bg-gray-800 text-purple-600 focus:ring-purple-500 focus:ring-offset-gray-900"
            />
            <label htmlFor="explicitContent" className="text-white">
              Explicit & Sensitive Content
            </label>
          </div>
        </div>
      )}
    </>
  );
}
