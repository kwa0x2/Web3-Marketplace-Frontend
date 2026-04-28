import { Layers, Tag } from 'lucide-react';

export type MarketplaceTab = 'nfts' | 'collections';

interface MarketplaceTabsProps {
  activeTab: MarketplaceTab;
  nftCount: number;
  collectionCount: number;
  onChange: (tab: MarketplaceTab) => void;
}

export function MarketplaceTabs({ activeTab, nftCount, collectionCount, onChange }: MarketplaceTabsProps) {
  const tabs = [
    { key: 'nfts' as MarketplaceTab, label: 'NFTs', icon: Tag, count: nftCount },
    { key: 'collections' as MarketplaceTab, label: 'Collections', icon: Layers, count: collectionCount },
  ];

  return (
    <div className="flex items-center gap-1 border-b border-white/[0.06] mb-7">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-all ${
            activeTab === tab.key
              ? 'text-white border-purple-500'
              : 'text-gray-500 border-transparent hover:text-gray-300 hover:border-gray-700'
          }`}
        >
          <tab.icon className="w-4 h-4" />
          {tab.label}
          <span className={`text-xs px-1.5 py-0.5 rounded-md tabular-nums ${
            activeTab === tab.key
              ? 'bg-purple-500/20 text-purple-300'
              : 'bg-white/[0.05] text-gray-600'
          }`}>
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
}
