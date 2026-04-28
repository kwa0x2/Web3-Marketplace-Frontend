'use client';

import { useState, useMemo } from 'react';
import { Loader2, Layers, Search } from 'lucide-react';
import { CollectionData } from '@/hooks/useCollections';
import { CollectionCard } from './collection-card';

interface CollectionsTabProps {
  collections: CollectionData[];
  isLoading: boolean;
  error: string | null;
}

export function CollectionsTab({ collections, isLoading, error }: CollectionsTabProps) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return collections;
    const q = search.toLowerCase();
    return collections.filter((c) => c.name.toLowerCase().includes(q));
  }, [collections, search]);

  return (
    <>
      {/* Search */}
      <div className="flex items-center gap-3 mb-6">
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-600" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search collections..."
            className="w-full pl-9 pr-3 py-2.5 bg-white/[0.04] ring-1 ring-white/[0.08] rounded-xl text-sm text-white placeholder-gray-600 focus:outline-none focus:ring-purple-500/50 transition-all"
          />
        </div>
        <span className="text-xs text-gray-600 ml-auto tabular-nums">
          {!isLoading && `${filtered.length} collections`}
        </span>
      </div>

      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-32 gap-3">
          <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
          <p className="text-gray-600 text-sm">Loading collections...</p>
        </div>
      ) : error ? (
        <div className="flex items-center justify-center py-32">
          <p className="text-red-400">{error}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-32">
          <div className="w-16 h-16 rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.06] flex items-center justify-center mb-4">
            <Layers className="w-8 h-8 text-gray-700" />
          </div>
          <h3 className="text-white font-semibold text-lg mb-1">No collections found</h3>
          <p className="text-gray-600 text-sm">Create your first collection when minting an NFT.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {filtered.map((collection) => (
            <CollectionCard key={collection.id} collection={collection} />
          ))}
        </div>
      )}
    </>
  );
}
