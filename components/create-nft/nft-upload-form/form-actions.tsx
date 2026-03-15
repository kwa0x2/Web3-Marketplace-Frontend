interface FormActionsProps {
  onBack: () => void;
  isUploading: boolean;
  isDisabled: boolean;
}

export function FormActions({ onBack, isUploading, isDisabled }: FormActionsProps) {
  return (
    <div className="flex items-center justify-between pt-4">
      <button
        type="button"
        onClick={onBack}
        disabled={isUploading}
        className="px-6 py-3 rounded-lg font-semibold text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        ← Back
      </button>

      <button
        type="submit"
        disabled={isDisabled}
        className="px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isUploading ? 'Creating NFT...' : 'Create NFT'}
      </button>
    </div>
  );
}
