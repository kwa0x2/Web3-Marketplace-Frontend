import { Check, Loader2, Tag } from 'lucide-react';
import { PriceInput } from './price-input';
import { EarningsCard } from './earnings-card';
import { StepIndicator } from './step-indicator';

interface ListForSaleProps {
  price: string;
  onPriceChange: (v: string) => void;
  priceParsed: number;
  effectiveRoyaltyBps: number;
  earnings: { royalty: number; youReceive: number } | null;
  step: string;
  error: string | null;
  syncError: string | null;
  isDone: boolean;
  isProcessing: boolean;
  tokenId?: number | null;
  onList: () => void;
  onReset: () => void;
  onClose: () => void;
}

export function ListForSale({
  price, onPriceChange, priceParsed,
  effectiveRoyaltyBps, earnings,
  step, error, syncError, isDone, isProcessing, tokenId,
  onList, onReset, onClose,
}: ListForSaleProps) {
  return (
    <>
      <PriceInput price={price} onChange={onPriceChange} disabled={isProcessing || isDone} />

      {earnings && (
        <EarningsCard earnings={earnings} royaltyBps={effectiveRoyaltyBps} />
      )}

      <StepIndicator step={step} error={error} />

      {syncError && (
        <p className="text-yellow-400 text-xs bg-yellow-500/10 border border-yellow-500/20 rounded-xl px-3 py-2">
          {syncError}
        </p>
      )}

      {isDone ? (
        <button
          onClick={onClose}
          className="w-full py-3.5 rounded-xl font-bold text-sm bg-green-600 hover:bg-green-500 text-white flex items-center justify-center gap-2 transition-all"
        >
          <Check className="w-4 h-4" /> Listed Successfully
        </button>
      ) : (
        <button
          onClick={step === 'error' ? onReset : onList}
          disabled={isProcessing || !price || priceParsed <= 0 || tokenId == null}
          className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
        >
          {isProcessing ? (
            <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
          ) : step === 'error' ? 'Try Again' : (
            <><Tag className="w-4 h-4" /> List for Sale</>
          )}
        </button>
      )}
    </>
  );
}
