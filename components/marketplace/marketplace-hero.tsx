import { LayoutGrid } from 'lucide-react';

interface MarketplaceHeroProps {
  nftCount: number;
  collectionCount: number;
  isLoading: boolean;
}

export function MarketplaceHero({ nftCount, collectionCount, isLoading }: MarketplaceHeroProps) {
  return (
    <div className="relative overflow-hidden border-b border-white/[0.06]">
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/40 via-blue-900/20 to-black" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(139,92,246,0.2),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,rgba(59,130,246,0.15),transparent_60%)]" />
      <div
        className="absolute inset-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />
      <div className="relative max-w-[1800px] mx-auto px-6 md:px-8 py-12">
        <div className="flex items-center gap-2 mb-3">
          <div className="w-7 h-7 rounded-lg bg-purple-500/20 flex items-center justify-center">
            <LayoutGrid className="w-3.5 h-3.5 text-purple-400" />
          </div>
          <span className="text-purple-400 text-sm font-medium">Marketplace</span>
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Explore</h1>
        <p className="text-gray-500 text-base max-w-md">
          Discover, collect and trade unique digital assets from creators around the world.
        </p>
        <div className="flex gap-8 mt-8">
          <div>
            <p className="text-2xl font-bold text-white tabular-nums">{isLoading ? '—' : nftCount}</p>
            <p className="text-gray-600 text-xs mt-0.5 uppercase tracking-wider">Listed NFTs</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-white tabular-nums">{isLoading ? '—' : collectionCount}</p>
            <p className="text-gray-600 text-xs mt-0.5 uppercase tracking-wider">Collections</p>
          </div>
        </div>
      </div>
    </div>
  );
}
