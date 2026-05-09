import { X, Check, Loader2, TrendingUp } from 'lucide-react';
import { Eth } from '@/components/icons/eth';
import { FeeBreakdown } from './fee-breakdown';
import { StatusBanner } from './status-banner';

interface ManageListingProps {
  price: string;
  onPriceChange: (v: string) => void;
  currentPrice?: number | null;
  priceParsed: number;
  effectiveRoyaltyBps: number;
  earnings: { royalty: number; youReceive: number } | null;
  step: string;
  stepLabel: string;
  isDone: boolean;
  statusColor: string;
  error: string | null;
  syncError: string | null;
  isProcessing: boolean;
  cancellingListing: boolean;
  tokenId?: number | null;
  onUpdate: () => void;
  onCancel: () => void;
  onReset: () => void;
  onClose: () => void;
}

export function ManageListing({
  price, onPriceChange, currentPrice, priceParsed,
  effectiveRoyaltyBps, earnings,
  step, stepLabel, isDone, statusColor, error, syncError,
  isProcessing, cancellingListing, tokenId,
  onUpdate, onCancel, onReset, onClose,
}: ManageListingProps) {
  return (
    <>
      <div>
        <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">
          Update Price
        </label>
        <div className="relative">
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <Eth className="w-4 h-4 text-purple-400" />
          </div>
          <input
            type="number"
            step="0.0001"
            min="0.0001"
            placeholder={currentPrice?.toString() ?? '0.00'}
            value={price}
            onChange={(e) => onPriceChange(e.target.value)}
            disabled={isProcessing || isDone}
            className="w-full bg-white/[0.03] ring-1 ring-white/[0.08] rounded-xl py-3 pl-9 pr-14 text-white text-base font-medium placeholder:text-gray-700 focus:outline-none focus:ring-purple-500/40 transition-all disabled:opacity-50"
          />
          <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">ETH</span>
        </div>
      </div>

      {earnings && (
        <FeeBreakdown price={priceParsed} royaltyBps={effectiveRoyaltyBps} earnings={earnings} />
      )}

      <StatusBanner step={step} label={stepLabel} isDone={isDone} color={statusColor} error={error} />

      {syncError && (
        <p className="text-yellow-400 text-xs bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-3 py-2">
          {syncError}
        </p>
      )}

      {isDone ? (
        <button
          onClick={onClose}
          className="w-full py-3 rounded-xl font-semibold text-sm bg-green-600 hover:bg-green-500 text-white flex items-center justify-center gap-2 transition-all"
        >
          <Check className="w-4 h-4" /> Done
        </button>
      ) : (
        <button
          onClick={step === 'error' ? onReset : onUpdate}
          disabled={isProcessing || !price || priceParsed <= 0 || tokenId == null}
          className="w-full py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
        >
          {isProcessing ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
          ) : step === 'error' ? 'Try Again' : (
            <><TrendingUp className="w-4 h-4" /> Update Price</>
          )}
        </button>
      )}

      <div className="flex items-center gap-3">
        <div className="flex-1 h-px bg-white/[0.05]" />
        <span className="text-[11px] text-gray-700">or</span>
        <div className="flex-1 h-px bg-white/[0.05]" />
      </div>

      <button
        onClick={onCancel}
        disabled={cancellingListing || isProcessing}
        className="w-full py-2.5 rounded-xl font-medium text-sm bg-red-500/8 hover:bg-red-500/15 text-red-500 border border-red-500/20 hover:border-red-500/30 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
      >
        {cancellingListing ? (
          <><Loader2 className="w-4 h-4 animate-spin" /> Cancelling...</>
        ) : (
          <><X className="w-4 h-4" /> Cancel Listing</>
        )}
      </button>
    </>
  );
}
