'use client';

import { useState } from 'react';
import { Navigation } from '@/components/home';
import { Input } from '@/components/ui/input';
import { Search, Loader2 } from 'lucide-react';
import NFTCollectionTable from '@/components/nft/nft-collection-table';
import { NFTCard } from '@/components/nft/nft-card';
import { useNFTList } from '@/hooks/useNFTList';
import { useTrendingCollections } from '@/hooks/useCollections';

type Tab = 'trending' | 'listing';

export default function MarketplacePage() {
  const [selectedTab, setSelectedTab] = useState<Tab>('trending');
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const [soldIds, setSoldIds] = useState<Set<string>>(new Set());

  const trendingCollections = useTrendingCollections();

  const { nfts, pagination, isLoading, error } = useNFTList({
    listed: true,
    page,
    limit: 20,
  });

  const visibleNfts = nfts.filter((nft) => !soldIds.has(nft.id));
  const filteredNfts = searchQuery
    ? visibleNfts.filter((nft) => nft.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : visibleNfts;

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <div className="max-w-[1800px] mx-auto px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-white">NFT Marketplace</h1>
          <div className="relative w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
            <Input
              type="text"
              placeholder="Search NFTs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 bg-[#1a1a1a] border-[#2a2a2a] text-white placeholder:text-gray-600 focus:border-gray-600"
            />
          </div>
        </div>

        <div className="flex items-center gap-8 mb-6">
          {(['trending', 'listing'] as Tab[]).map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedTab(tab)}
              className={`text-2xl font-bold pb-2 border-b-2 transition-colors capitalize ${
                selectedTab === tab
                  ? 'text-white border-white'
                  : 'text-gray-600 border-transparent hover:text-gray-400'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {selectedTab === 'trending' ? (
          <NFTCollectionTable
            collections={trendingCollections}
            defaultCurrency="ETH"
            theme="dark"
            showCurrencyToggle={true}
            showTimeFilters={true}
            defaultTimeFilter="24h"
          />
        ) : (
          <div>
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
              </div>
            ) : error ? (
              <div className="text-center py-20">
                <p className="text-red-400">{error}</p>
              </div>
            ) : filteredNfts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No NFTs found</p>
                <p className="text-gray-600 text-sm mt-2">Be the first to create one!</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                  {filteredNfts.map((nft) => (
                    <NFTCard
                      key={nft.id}
                      nft={nft}
                      onPurchase={() => setSoldIds((prev) => new Set(prev).add(nft.id))}
                    />
                  ))}
                </div>

                {pagination.totalPages > 1 && (
                  <div className="flex items-center justify-center gap-3 mt-8">
                    <button
                      onClick={() => setPage((p) => Math.max(1, p - 1))}
                      disabled={page === 1}
                      className="px-4 py-2 rounded-lg bg-[#1a1a1a] text-white disabled:opacity-30 hover:bg-[#2a2a2a] transition-colors"
                    >
                      Previous
                    </button>
                    <span className="text-gray-400 text-sm">
                      {pagination.page} / {pagination.totalPages}
                    </span>
                    <button
                      onClick={() => setPage((p) => Math.min(pagination.totalPages, p + 1))}
                      disabled={page >= pagination.totalPages}
                      className="px-4 py-2 rounded-lg bg-[#1a1a1a] text-white disabled:opacity-30 hover:bg-[#2a2a2a] transition-colors"
                    >
                      Next
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
