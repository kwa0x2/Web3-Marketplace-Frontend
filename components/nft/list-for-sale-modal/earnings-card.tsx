import { Eth } from '@/components/icons/eth';

interface EarningsCardProps {
  earnings: { youReceive: number };
  royaltyBps: number;
}

export function EarningsCard({ earnings, royaltyBps }: EarningsCardProps) {
  return (
    <div className="bg-white/[0.02] ring-1 ring-white/[0.06] rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <span className="text-xs text-gray-500">You receive</span>
        <div className="flex items-center gap-1.5">
          <Eth className="w-3.5 h-3.5 text-purple-400" />
          <span className="text-white font-bold text-lg tabular-nums">
            {earnings.youReceive.toFixed(4)}
          </span>
          <span className="text-gray-500 text-sm">ETH</span>
        </div>
      </div>
      {royaltyBps > 0 && (
        <p className="text-[11px] text-gray-600 mt-1.5 text-right">
          After {royaltyBps / 100}% creator royalty
        </p>
      )}
    </div>
  );
}
