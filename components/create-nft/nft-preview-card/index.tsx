'use client';

import { Share2, MoreVertical } from 'lucide-react';
import { useAccount } from 'wagmi';
import { NFTPreviewCardProps } from './types';
import { PreviewImage } from './preview-image';
import { CreatorInfo } from './creator-info';
import { PropertiesGrid } from './properties-grid';
import { PreviewStats } from './preview-stats';

export function NFTPreviewCard({
  name,
  description,
  price,
  currency,
  imagePreview,
  category,
  royalties,
  properties = []
}: NFTPreviewCardProps) {
  const { address } = useAccount();

  const displayName = name || 'Untitled NFT';
  const hasPrice = !!price && parseFloat(price) > 0;

  return (
    <div className="sticky top-8">
      <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl border border-purple-500/20 overflow-hidden shadow-2xl shadow-purple-500/10">
        <div className="p-4 border-b border-gray-700/50">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center">
              <span className="w-2 h-2 rounded-full bg-purple-500 mr-2 animate-pulse" />
              Live Preview
            </h3>
            <div className="flex items-center space-x-2">
              <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                <Share2 className="w-4 h-4 text-gray-400" />
              </button>
              <button className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors">
                <MoreVertical className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        <div className="bg-gray-900/50">
          <PreviewImage
            imagePreview={imagePreview}
            displayName={displayName}
            category={category}
          />

          <div className="p-5 space-y-4">
            <div>
              <div className="flex items-start justify-between mb-2">
                <h4 className="text-xl font-bold text-white flex-1 line-clamp-2">
                  {displayName}
                </h4>
                {hasPrice && (
                  <div className="ml-3 text-right">
                    <p className="text-xs text-gray-400 mb-1">Price</p>
                    <div className="flex items-baseline space-x-1">
                      <span className="text-lg font-bold text-purple-400">{price}</span>
                      <span className="text-sm text-gray-400">{currency || 'ETH'}</span>
                    </div>
                  </div>
                )}
              </div>

              {description && (
                <p className="text-gray-400 text-sm line-clamp-2">
                  {description}
                </p>
              )}
            </div>

            <CreatorInfo address={address} />
            <PropertiesGrid properties={properties} />
            <PreviewStats hasPrice={hasPrice} royalties={royalties} />

            {imagePreview && (
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button className="px-4 py-2 bg-gray-700/50 hover:bg-gray-700 text-white rounded-lg font-semibold transition-colors text-sm">
                  Make Offer
                </button>
                <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-lg font-semibold transition-all hover:scale-105 text-sm">
                  Buy Now
                </button>
              </div>
            )}
          </div>
        </div>

        <div className="px-5 py-3 bg-gray-800/30 border-t border-gray-700/50">
          <p className="text-xs text-gray-500 text-center">
            This is how your NFT will appear in the marketplace
          </p>
        </div>
      </div>
    </div>
  );
}
