import Image from 'next/image';
import { ImageIcon } from 'lucide-react';
import { Eth } from '@/components/icons/eth';
import { NFTCardData } from '../nft-card';

interface NftPreviewProps {
  nft: NFTCardData;
  imgError: boolean;
  onImgError: () => void;
  isListed: boolean;
}

export function NftPreview({ nft, imgError, onImgError, isListed }: NftPreviewProps) {
  return (
    <div className="px-5 pt-4">
      <div className="flex items-center gap-3.5 bg-white/[0.03] rounded-xl p-3 ring-1 ring-white/[0.06]">
        <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-[#111] flex-shrink-0">
          {imgError ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageIcon className="w-5 h-5 text-gray-700" />
            </div>
          ) : (
            <Image src={nft.fileGatewayUrl} alt={nft.name} fill className="object-cover" onError={onImgError} />
          )}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-white font-semibold text-sm truncate">{nft.name}</p>
          <p className="text-gray-600 text-xs mt-0.5">Token #{nft.tokenId}</p>
          {isListed && (
            <div className="flex items-center gap-1.5 mt-1.5">
              <span className="flex items-center gap-1 text-xs text-gray-400">
                <Eth className="w-3 h-3 text-purple-400" />
                {nft.price} ETH
              </span>
              <span className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 rounded-full font-medium">
                Active
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
