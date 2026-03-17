'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Eth } from '@/components/icons/eth';
import { NFTDetailModal } from './nft-detail-modal';

export interface NFTCardData {
  id: string;
  name: string;
  description?: string | null;
  category?: string | null;
  fileGatewayUrl: string;
  royaltyBps: number;
  creatorAddress: string;
  contractAddress?: string;
  creator?: { address: string; avatar?: string | null };
  txHash?: string | null;
  tokenId?: number | null;
  chainId: number;
  price?: number | null;
  currency?: string | null;
  metadataGatewayUrl?: string;
}

interface NFTCardProps {
  nft: NFTCardData;
  onPurchase?: () => void;
}

export function NFTCard({ nft, onPurchase }: NFTCardProps) {
  const [showModal, setShowModal] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgError, setImgError] = useState(false);
  const shortAddress = `${nft.creatorAddress.slice(0, 6)}...${nft.creatorAddress.slice(-4)}`;

  return (
    <>
      <div
        onClick={() => setShowModal(true)}
        className="group relative bg-[#18181b] rounded-xl overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-purple-500/20 ring-1 ring-white/[0.06] hover:ring-purple-500/40"
      >
        <div className="relative aspect-square overflow-hidden bg-[#111]">
          {!imgLoaded && !imgError && (
            <Skeleton className="absolute inset-0 rounded-none" />
          )}
          {imgError ? (
            <div className="absolute inset-0 flex items-center justify-center bg-[#111]">
              <ImageIcon className="w-10 h-10 text-gray-700" />
            </div>
          ) : (
            <Image
              src={nft.fileGatewayUrl}
              alt={nft.name}
              fill
              className={`object-cover transition-all duration-500 group-hover:scale-105 ${imgLoaded ? 'opacity-100' : 'opacity-0'}`}
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgError(true)}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          {nft.category && (
            <span className="absolute top-2.5 left-2.5 px-2 py-0.5 bg-white/10 backdrop-blur-md rounded-md text-[11px] font-medium text-white/90 tracking-wide uppercase">
              {nft.category}
            </span>
          )}
        </div>

        <div className="p-3.5">
          <h3 className="text-[15px] font-semibold text-white truncate leading-tight">{nft.name}</h3>

          <div className="flex items-center gap-1.5 mt-2">
            <div className="w-5 h-5 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex-shrink-0" />
            <span className="text-gray-500 text-xs font-mono truncate">{shortAddress}</span>
          </div>

          <div className="mt-3 pt-3 border-t border-white/[0.06]">
            {nft.price != null ? (
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-gray-500 uppercase tracking-wider">Price</span>
                <div className="flex items-center gap-1.5">
                  <Eth className="w-3.5 h-3.5 text-purple-400" />
                  <span className="text-white text-sm font-bold tabular-nums">{nft.price}</span>
                  <span className="text-gray-500 text-xs">{nft.currency || 'ETH'}</span>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-between">
                <span className="text-[11px] text-gray-500 uppercase tracking-wider">Status</span>
                <span className="text-gray-600 text-xs">Not listed</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {showModal && (
        <NFTDetailModal
          nft={nft}
          onClose={() => setShowModal(false)}
          onPurchase={onPurchase}
        />
      )}
    </>
  );
}
