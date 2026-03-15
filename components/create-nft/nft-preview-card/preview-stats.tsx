import { TrendingUp } from 'lucide-react';

interface PreviewStatsProps {
  hasPrice: boolean;
  royalties?: string;
}

export function PreviewStats({ hasPrice, royalties }: PreviewStatsProps) {
  if (!hasPrice && !royalties) return null;

  return (
    <div className="pt-3 border-t border-gray-700/50">
      <div className="grid grid-cols-2 gap-3">
        {hasPrice && (
          <div className="text-center p-2 bg-gray-800/30 rounded-lg">
            <TrendingUp className="w-4 h-4 text-green-400 mx-auto mb-1" />
            <p className="text-xs text-gray-400">Listed</p>
            <p className="text-sm text-white font-semibold">For Sale</p>
          </div>
        )}
        {royalties && parseFloat(royalties) > 0 && (
          <div className="text-center p-2 bg-gray-800/30 rounded-lg">
            <svg className="w-4 h-4 text-purple-400 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <p className="text-xs text-gray-400">Royalty</p>
            <p className="text-sm text-white font-semibold">{royalties}%</p>
          </div>
        )}
      </div>
    </div>
  );
}
