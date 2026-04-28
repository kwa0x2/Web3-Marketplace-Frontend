'use client';

import { useState, useMemo } from 'react';
import { Loader2, Search, SlidersHorizontal, X } from 'lucide-react';
import { NFTCard, NFTCardData } from '@/components/nft/nft-card';

type SortOption = 'newest' | 'price_asc' | 'price_desc';

interface Pagination {
  page: number;
  totalPages: number;
  total: number;
}

interface NFTTabProps {
  nfts: NFTCardData[];
  pagination: Pagination;
  isLoading: boolean;
  error: string | null;
  page: number;
  onPageChange: (page: number) => void;
}

export function NFTTab({ nfts, pagination, isLoading, error, page, onPageChange }: NFTTabProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [soldIds, setSoldIds] = useState<Set<string>>(new Set());

  const filteredNfts = useMemo(() => {
    let result = nfts.filter((nft) => !soldIds.has(nft.id));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter((nft) => nft.name.toLowerCase().includes(q));
    }
    if (sortBy === 'price_asc') result = [...result].sort((a, b) => (a.price ?? 0) - (b.price ?? 0));
    else if (sortBy === 'price_desc') result = [...result].sort((a, b) => (b.price ?? 0) - (a.price ?? 0));
    return result;
  }, [nfts, soldIds, searchQuery, sortBy]);

  const hasActiveFilters = !!(searchQuery || sortBy !== 'newest');

  const clearFilters = () => {
    setSearchQuery('');
    setSortBy('newest');
  };

  return (
    <>
      {/* Filter Bar */}
      <div className="flex flex-wrap items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search NFTs..."
            className="w-full pl-9 pr-3 py-2.5 bg-white/[0.04] ring-1 ring-white/[0.08] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-purple-500/50 transition-all"
          />
        </div>
        <div className="flex items-center gap-2 bg-white/[0.04] ring-1 ring-white/[0.08] rounded-xl px-3 py-2.5">
          <SlidersHorizontal className="w-3.5 h-3.5 text-gray-600 flex-shrink-0" />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="bg-transparent text-sm text-gray-300 focus:outline-none cursor-pointer appearance-none"
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
        {hasActiveFilters && (
          <button onClick={clearFilters} className="flex items-center gap-1.5 px-3 py-2.5 text-xs text-gray-500 hover:text-red-400 transition-colors">
            <X className="w-3.5 h-3.5" />
            Clear
          </button>
        )}
        <span className="text-xs text-gray-600 ml-auto tabular-nums">
          {!isLoading && `${filteredNfts.length} NFTs`}
        </span>
      </div>

      {/* Grid */}
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-3">
          <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
          <p className="text-gray-600 text-sm">Loading NFTs...</p>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center py-32">
          <p className="text-red-400">{error}</p>
        </div>
      ) : filteredNfts.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.06] flex items-center justify-center mb-4">
            <Search className="w-8 h-8 text-gray-700" />
          </div>
          <h3 className="text-white font-semibold text-lg mb-1">No NFTs found</h3>
          <p className="text-gray-600 text-sm mb-4">
            {hasActiveFilters ? 'Try adjusting your filters.' : 'Be the first to list an NFT!'}
          </p>
          {hasActiveFilters && (
            <button onClick={clearFilters} className="text-purple-400 hover:text-purple-300 text-sm underline underline-offset-2 transition-colors">
              Clear filters
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-5">
          {filteredNfts.map((nft) => (
            <NFTCard
              key={nft.id}
              nft={nft}
              onPurchase={() => setSoldIds((prev) => new Set(prev).add(nft.id))}
            />
          ))}
        </div>
      )}

      {/* Pagination */}
      {!isLoading && pagination.totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 mt-10">
          <button
            onClick={() => onPageChange(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-5 py-2.5 rounded-xl bg-white/[0.04] ring-1 ring-white/[0.08] text-white text-sm disabled:opacity-30 hover:bg-white/[0.08] transition-colors"
          >
            Previous
          </button>
          <div className="flex items-center gap-1">
            {Array.from({ length: Math.min(pagination.totalPages, 5) }, (_, i) => {
              const p = i + 1;
              return (
                <button
                  key={p}
                  onClick={() => onPageChange(p)}
                  className={`w-9 h-9 rounded-lg text-sm font-medium transition-all ${
                    page === p ? 'bg-purple-600 text-white' : 'text-gray-500 hover:bg-white/[0.06] hover:text-white'
                  }`}
                >
                  {p}
                </button>
              );
            })}
          </div>
          <button
            onClick={() => onPageChange(Math.min(pagination.totalPages, page + 1))}
            disabled={page >= pagination.totalPages}
            className="px-5 py-2.5 rounded-xl bg-white/[0.04] ring-1 ring-white/[0.08] text-white text-sm disabled:opacity-30 hover:bg-white/[0.08] transition-colors"
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
