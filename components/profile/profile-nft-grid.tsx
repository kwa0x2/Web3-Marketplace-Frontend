'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Loader2, Search, SlidersHorizontal, X, ShoppingBag, Tag, Plus } from 'lucide-react';
import { NFTCard, NFTCardData } from '@/components/nft/nft-card';
import { Button } from '@/components/ui/button';
import { ProfileTab } from './profile-tabs';

type SortOption = 'default' | 'price_asc' | 'price_desc' | 'name_az';

interface ProfileNFTGridProps {
  nfts: NFTCardData[];
  activeTab: ProfileTab;
  isLoading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  onListNFT: (nft: NFTCardData) => void;
  onTabChange: (tab: ProfileTab) => void;
}

export function ProfileNFTGrid({
  nfts,
  activeTab,
  isLoading,
  error,
  isAuthenticated,
  onListNFT,
  onTabChange,
}: ProfileNFTGridProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const availableCategories = useMemo(() => {
    const cats = new Set<string>();
    nfts.forEach((nft) => { if (nft.category) cats.add(nft.category); });
    return Array.from(cats).sort();
  }, [nfts]);

  const filteredNFTs = useMemo(() => {
    let result = [...nfts];
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((nft) => nft.name.toLowerCase().includes(q));
    }
    if (filterCategory) result = result.filter((nft) => nft.category === filterCategory);
    if (sortBy === 'price_asc') result.sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    else if (sortBy === 'price_desc') result.sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    else if (sortBy === 'name_az') result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [nfts, searchQuery, filterCategory, sortBy]);

  const hasActiveFilters = !!(searchQuery || filterCategory || sortBy !== 'default');

  const clearFilters = () => {
    setSearchQuery('');
    setFilterCategory('');
    setSortBy('default');
  };

  return (
    <div className="py-8">
      {/* Filter Bar */}
      {!isLoading && nfts.length > 0 && (
        <div className="flex flex-wrap items-center gap-3 mb-6">
          <div className="relative flex-1 min-w-[180px] max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search NFTs..."
              className="w-full pl-9 pr-3 py-2 bg-white/[0.04] ring-1 ring-white/[0.08] rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-purple-500/50 transition-all"
            />
          </div>
          {availableCategories.length > 0 && (
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 bg-white/[0.04] ring-1 ring-white/[0.08] rounded-lg text-sm text-gray-300 focus:outline-none focus:ring-purple-500/50 transition-all appearance-none cursor-pointer"
            >
              <option value="">All Categories</option>
              {availableCategories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          )}
          <div className="flex items-center gap-1.5">
            <SlidersHorizontal className="w-3.5 h-3.5 text-gray-600" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="px-3 py-2 bg-white/[0.04] ring-1 ring-white/[0.08] rounded-lg text-sm text-gray-300 focus:outline-none focus:ring-purple-500/50 transition-all appearance-none cursor-pointer"
            >
              <option value="default">Default</option>
              <option value="name_az">Name A–Z</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
          {hasActiveFilters && (
            <>
              <button
                onClick={clearFilters}
                className="flex items-center gap-1.5 px-3 py-2 text-xs text-gray-500 hover:text-red-400 transition-colors"
              >
                <X className="w-3.5 h-3.5" />
                Clear
              </button>
              <span className="text-xs text-gray-600 ml-auto">
                {filteredNFTs.length} of {nfts.length}
              </span>
            </>
          )}
        </div>
      )}

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
        </div>
      ) : error ? (
        <div className="text-center py-20">
          <p className="text-red-400">{error}</p>
        </div>
      ) : nfts.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.06] flex items-center justify-center">
            {activeTab === 'owned'
              ? <ShoppingBag className="w-8 h-8 text-gray-700" />
              : <Tag className="w-8 h-8 text-gray-700" />
            }
          </div>
          <h3 className="text-white font-semibold text-lg mb-1">
            {activeTab === 'owned' ? 'No NFTs Owned' : 'No Active Listings'}
          </h3>
          <p className="text-gray-600 text-sm mb-6 max-w-sm mx-auto">
            {activeTab === 'owned'
              ? 'Your NFTs will appear here. Mint or buy NFTs to get started.'
              : 'List your NFTs for sale from the Owned tab.'}
          </p>
          {activeTab === 'owned' ? (
            <Link href="/marketplace">
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 gap-2">
                <Plus className="w-4 h-4" />
                Browse Marketplace
              </Button>
            </Link>
          ) : (
            <button
              onClick={() => onTabChange('owned')}
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white text-sm font-medium px-4 py-2 rounded-xl gap-2 flex items-center mx-auto transition-all"
            >
              <Plus className="w-4 h-4" />
              View Owned NFTs
            </button>
          )}
        </div>
      ) : filteredNFTs.length === 0 ? (
        <div className="text-center py-20">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.06] flex items-center justify-center">
            <Search className="w-8 h-8 text-gray-700" />
          </div>
          <h3 className="text-white font-semibold text-lg mb-1">No results</h3>
          <p className="text-gray-600 text-sm mb-4">No NFTs match your current filters.</p>
          <button
            onClick={clearFilters}
            className="text-purple-400 hover:text-purple-300 text-sm underline underline-offset-2 transition-colors"
          >
            Clear filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {filteredNFTs.map((nft) => (
            <div key={nft.id} className="relative group/card">
              {/* Listed badge */}
              {nft.price != null && nft.price > 0 && (
                <div className="absolute top-2.5 right-2.5 z-30 pointer-events-none">
                  <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md border border-emerald-500/40 text-[10px] font-bold text-emerald-400 shadow-lg">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Listed
                  </span>
                </div>
              )}

              {/* Hover overlay */}
              {isAuthenticated && nft.tokenId != null && (
                <div className="absolute top-0 left-0 right-0 aspect-square z-20 rounded-t-xl overflow-hidden pointer-events-none">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-full group-hover/card:translate-y-0 transition-transform duration-300 ease-out pointer-events-auto">
                    <button
                      onClick={(e) => { e.stopPropagation(); onListNFT(nft); }}
                      className={`w-full py-3 rounded-2xl text-[13px] font-bold flex items-center justify-center gap-2 backdrop-blur-xl border shadow-2xl transition-all active:scale-95 ${
                        nft.price != null
                          ? 'bg-emerald-500/20 hover:bg-emerald-500/35 border-emerald-400/50 text-emerald-300 shadow-emerald-900/40'
                          : 'bg-white/[0.1] hover:bg-white/[0.18] border-white/[0.18] text-white shadow-black/60'
                      }`}
                    >
                      <Tag className="w-3.5 h-3.5" />
                      {nft.price != null ? 'Manage Listing' : 'List for Sale'}
                    </button>
                  </div>
                </div>
              )}

              <NFTCard nft={nft} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
