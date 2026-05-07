'use client';

import Link from 'next/link';
import { Loader2, LayoutGrid, Plus, CheckCircle2 } from 'lucide-react';
import { MyCollectionData } from '@/hooks/useCollections';
import { Button } from '@/components/ui/button';

interface ProfileCollectionGridProps {
  collections: MyCollectionData[];
  isLoading: boolean;
  error: string | null;
}

export function ProfileCollectionGrid({ collections, isLoading, error }: ProfileCollectionGridProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 text-purple-500 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20">
        <p className="text-red-400">{error}</p>
      </div>
    );
  }

  if (collections.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-white/[0.03] ring-1 ring-white/[0.06] flex items-center justify-center">
          <LayoutGrid className="w-8 h-8 text-gray-700" />
        </div>
        <h3 className="text-white font-semibold text-lg mb-1">No Collections</h3>
        <p className="text-gray-600 text-sm mb-6 max-w-sm mx-auto">
          You haven&apos;t created any collections yet.
        </p>
        <Link href="/create">
          <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 gap-2">
            <Plus className="w-4 h-4" />
            Create Collection
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
        {collections.map((col) => (
          <Link key={col.id} href={`/collections/${col.id}`} className="group block">
            <div className="rounded-2xl overflow-hidden bg-white/[0.03] ring-1 ring-white/[0.06] hover:ring-purple-500/40 transition-all duration-200 hover:-translate-y-0.5">
              {/* Banner */}
              <div className="relative h-24 bg-gradient-to-br from-purple-900/60 via-blue-900/40 to-black overflow-hidden">
                {col.banner && (
                  <img
                    src={col.banner}
                    alt=""
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity"
                  />
                )}
                {col.verified && (
                  <div className="absolute top-2 right-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-400 drop-shadow" />
                  </div>
                )}
              </div>

              {/* Avatar + Info */}
              <div className="px-4 pb-4">
                <div className="-mt-5 mb-3">
                  <div className="w-10 h-10 rounded-xl ring-2 ring-black overflow-hidden bg-white/[0.06]">
                    {col.image ? (
                      <img src={col.image} alt={col.name} className="w-full h-full object-cover" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-700 to-blue-700">
                        <span className="text-[10px] font-bold text-white">{col.symbol.slice(0, 2)}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 mb-1">
                  <h3 className="text-white text-sm font-semibold truncate">{col.name}</h3>
                  <span className="text-gray-600 text-xs shrink-0">{col.symbol}</span>
                </div>

                {col.description && (
                  <p className="text-gray-500 text-xs line-clamp-2 mb-3">{col.description}</p>
                )}

                <div className="flex items-center justify-between pt-3 border-t border-white/[0.05]">
                  <div className="text-center">
                    <p className="text-white text-sm font-bold tabular-nums">{col.itemCount}</p>
                    <p className="text-gray-600 text-[10px] uppercase tracking-wide">Items</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white text-sm font-bold tabular-nums">
                      {col.floorPrice > 0 ? `${col.floorPrice} ETH` : '—'}
                    </p>
                    <p className="text-gray-600 text-[10px] uppercase tracking-wide">Floor</p>
                  </div>
                  <div className="text-center">
                    <p className="text-white text-sm font-bold tabular-nums">{col.listedCount}</p>
                    <p className="text-gray-600 text-[10px] uppercase tracking-wide">Listed</p>
                  </div>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
