'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, ImageIcon } from 'lucide-react';
import { CollectionData } from '@/hooks/useCollections';
import { Eth } from '@/components/icons/eth';

export function CollectionCard({ collection }: { collection: CollectionData }) {
  const [bannerError, setBannerError] = useState(false);
  const [avatarError, setAvatarError] = useState(false);
  const shortAddress = `${collection.ownerAddress.slice(0, 6)}...${collection.ownerAddress.slice(-4)}`;

  return (
    <Link href={`/collections/${collection.id}`}>
      <div className="group bg-[#18181b] rounded-2xl ring-1 ring-white/[0.06] hover:ring-purple-500/40 transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/10 cursor-pointer overflow-hidden">
        {/* Banner */}
        <div className="relative h-24 bg-gradient-to-br from-purple-900/60 via-blue-900/40 to-[#111]">
          {collection.image && !bannerError && (
            <Image
              src={collection.image}
              alt={collection.name}
              fill
              className="object-cover opacity-50 group-hover:opacity-70 transition-opacity duration-300"
              onError={() => setBannerError(true)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-[#18181b]/80 to-transparent" />
          {collection.verified && (
            <div className="absolute top-2.5 right-2.5 z-10">
              <CheckCircle2 className="w-4 h-4 text-blue-400 drop-shadow" />
            </div>
          )}
        </div>

        {/* Info */}
        <div className="px-4 pb-4">
          {/* Avatar */}
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 p-[2px] shadow-lg -mt-7 mb-3 relative">
            <div className="relative w-full h-full rounded-[10px] bg-[#18181b] overflow-hidden flex items-center justify-center">
              {collection.image && !avatarError ? (
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover"
                  onError={() => setAvatarError(true)}
                />
              ) : (
                <ImageIcon className="w-5 h-5 text-gray-700" />
              )}
            </div>
          </div>

          <h3 className="text-white font-bold text-sm truncate">{collection.name}</h3>
          <p className="text-gray-600 text-xs font-mono mt-0.5 truncate">{shortAddress}</p>

          <div className="grid grid-cols-3 gap-2 mt-3.5 pt-3.5 border-t border-white/[0.06]">
            <div>
              <p className="text-[10px] text-gray-600 uppercase tracking-wider">Items</p>
              <p className="text-white text-xs font-semibold mt-0.5 tabular-nums">{collection.itemCount}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-600 uppercase tracking-wider">Floor</p>
              <div className="flex items-center gap-0.5 mt-0.5">
                <Eth className="w-2.5 h-2.5 text-purple-400 flex-shrink-0" />
                <p className="text-white text-xs font-semibold tabular-nums">
                  {collection.floorPrice > 0 ? collection.floorPrice.toFixed(3) : '—'}
                </p>
              </div>
            </div>
            <div>
              <p className="text-[10px] text-gray-600 uppercase tracking-wider">Listed</p>
              <p className="text-white text-xs font-semibold mt-0.5 tabular-nums">{collection.listedCount}</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
