import { ArrowRight } from 'lucide-react';

interface FeeBreakdownProps {
  price: number;
  royaltyBps: number;
  earnings: { royalty: number; youReceive: number };
}

export function FeeBreakdown({ price, royaltyBps, earnings }: FeeBreakdownProps) {
  return (
    <div className="bg-white/[0.02] ring-1 ring-white/[0.06] rounded-xl p-3.5 space-y-2.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500">Listing Price</span>
        <span className="text-gray-300 font-medium">{price.toFixed(4)} ETH</span>
      </div>
      {royaltyBps > 0 && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Creator Royalty ({royaltyBps / 100}%)</span>
          <span className="text-gray-500">− {earnings.royalty.toFixed(4)} ETH</span>
        </div>
      )}
      <div className="flex items-center justify-between text-xs pt-2 border-t border-white/[0.05]">
        <span className="text-white font-semibold flex items-center gap-1.5">
          <ArrowRight className="w-3 h-3 text-purple-400" />
          You receive
        </span>
        <span className="text-purple-300 font-bold">{earnings.youReceive.toFixed(4)} ETH</span>
      </div>
    </div>
  );
}
