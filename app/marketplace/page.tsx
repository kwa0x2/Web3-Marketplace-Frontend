'use client';

import { useState } from 'react';
import { Navigation } from '@/components/home';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';
import { MOCK_NFT_COLLECTIONS } from '@/lib/mock_data';
import NFTCollectionTable from '@/components/shared/nft-collection-table';

export default function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState('NFTs');
  const [selectedTab, setSelectedTab] = useState<'trending' | 'holding'>('trending');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <div className="max-w-[1800px] mx-auto px-8 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-6">
            <h1 className="text-2xl font-bold text-white">NFT Marketplace</h1>
          </div>

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

        <>
            <div className="flex items-center gap-8 mb-6">
              <button
                onClick={() => setSelectedTab('trending')}
                className={`text-2xl font-bold pb-2 border-b-2 transition-colors ${
                  selectedTab === 'trending'
                    ? 'text-white border-white'
                    : 'text-gray-600 border-transparent'
                }`}
              >
                Trending
              </button>
              <button
                onClick={() => setSelectedTab('holding')}
                className={`text-2xl font-bold pb-2 border-b-2 transition-colors ${
                  selectedTab === 'holding'
                    ? 'text-white border-white'
                    : 'text-gray-600 border-transparent'
                }`}
              >
                Holding
              </button>
            </div>

            {/* Collections Table */}
            <NFTCollectionTable
              collections={MOCK_NFT_COLLECTIONS}
              defaultCurrency="ETH"
              theme="dark"
              showCurrencyToggle={true}
              showTimeFilters={true}
              defaultTimeFilter="24h"
            />
          </>
      </div>
    </div>
  );
}
