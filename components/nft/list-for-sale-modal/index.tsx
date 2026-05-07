'use client';

import { useState, useMemo } from 'react';
import { X, Tag } from 'lucide-react';
import { NFTCardData } from '../nft-card';
import { useNFTList as useNFTListOnChain } from '@/hooks/useNFTMarketplace';
import { useChainId, useAccount } from 'wagmi';
import { getNFTContractAddress } from '@/lib/contracts/Web3MarketplaceNFT';
import apiClient from '@/api/axios';

import { NftPreview } from './nft-preview';
import { ManageListing } from './manage-listing';
import { ListForSale } from './list-for-sale';

const STEP_LABELS: Record<string, string> = {
  cancelling: 'Removing old listing...',
  approving:  'Approving NFT for marketplace...',
  listing:    'Listing on blockchain...',
  done:       'Success!',
  error:      'Failed',
};

interface ListForSaleModalProps {
  nft: NFTCardData;
  onClose: () => void;
  onSuccess?: () => void;
}

export function ListForSaleModal({ nft, onClose, onSuccess }: ListForSaleModalProps) {
  const chainId = useChainId();
  const { address: walletAddress } = useAccount();
  getNFTContractAddress(chainId);

  const [price, setPrice] = useState('');
  const [imgError, setImgError] = useState(false);
  const [cancellingListing, setCancellingListing] = useState(false);
  const [backendUpdating, setBackendUpdating] = useState(false);
  const [syncError, setSyncError] = useState<string | null>(null);

  const { list, cancel, update, step, error, reset } = useNFTListOnChain();

  const isListed = nft.price != null && nft.price > 0;
  const isCreator = walletAddress?.toLowerCase() === nft.creatorAddress?.toLowerCase();
  const effectiveRoyaltyBps = isCreator ? 0 : (nft.royaltyBps || 0);

  const priceParsed = parseFloat(price || '0');
  const earnings = useMemo(() => {
    if (!priceParsed || priceParsed <= 0) return null;
    const royalty = priceParsed * (effectiveRoyaltyBps / 10000);
    return { royalty, youReceive: priceParsed - royalty };
  }, [priceParsed, effectiveRoyaltyBps]);

  const isProcessing = ['cancelling', 'approving', 'listing'].includes(step) || backendUpdating;
  const isDone = step === 'done' && !backendUpdating;
  const stepLabel = backendUpdating ? 'Updating records...' : STEP_LABELS[step] || '';
  const statusColor = step === 'error' ? 'red' : isDone ? 'green' : 'purple';

  const syncBackend = async (newPrice: number | null) => {
    setBackendUpdating(true);
    setSyncError(null);
    try {
      const url = nft.tokenId != null
        ? `/nft/token/${nft.tokenId}/price`
        : `/nft/${nft.id}/price`;
      await apiClient.patch(url, {
        price: newPrice,
        currency: newPrice != null ? 'ETH' : null,
      });
    } catch (err: any) {
      const msg = err?.response?.data?.error || err?.message || 'Failed to sync price';
      setSyncError(`On-chain updated. DB sync failed: ${msg}`);
    } finally {
      setBackendUpdating(false);
    }
  };

  const handleList = async () => {
    if (nft.tokenId == null || !price || priceParsed <= 0) return;
    const success = await list(nft.tokenId, price);
    if (success) { await syncBackend(priceParsed); onSuccess?.(); }
  };

  const handleUpdate = async () => {
    if (nft.tokenId == null || !price || priceParsed <= 0) return;
    const success = await update(nft.tokenId, price);
    if (success) { await syncBackend(priceParsed); onSuccess?.(); }
  };

  const handleCancel = async () => {
    if (nft.tokenId == null) return;
    setCancellingListing(true);
    const success = await cancel(nft.tokenId);
    if (success) { await syncBackend(null); onSuccess?.(); onClose(); }
    setCancellingListing(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div
        className="relative bg-[#0f0f0f] ring-1 ring-white/[0.08] rounded-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between px-5 py-4 border-b border-white/[0.06]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center">
              <Tag className="w-4 h-4 text-purple-400" />
            </div>
            <h2 className="text-base font-bold text-white">
              {isListed ? 'Manage Listing' : 'List for Sale'}
            </h2>
          </div>
          <button onClick={onClose} className="p-1.5 hover:bg-white/[0.06] rounded-lg transition-colors">
            <X className="w-4 h-4 text-gray-500" />
          </button>
        </div>

        <NftPreview nft={nft} imgError={imgError} onImgError={() => setImgError(true)} isListed={isListed} />

        <div className="px-5 py-4 space-y-4">
          {isListed ? (
            <ManageListing
              price={price}
              onPriceChange={setPrice}
              currentPrice={nft.price}
              priceParsed={priceParsed}
              effectiveRoyaltyBps={effectiveRoyaltyBps}
              earnings={earnings}
              step={step}
              stepLabel={stepLabel}
              isDone={isDone}
              statusColor={statusColor}
              error={error}
              syncError={syncError}
              isProcessing={isProcessing}
              cancellingListing={cancellingListing}
              tokenId={nft.tokenId}
              onUpdate={handleUpdate}
              onCancel={handleCancel}
              onReset={reset}
              onClose={onClose}
            />
          ) : (
            <ListForSale
              price={price}
              onPriceChange={setPrice}
              priceParsed={priceParsed}
              effectiveRoyaltyBps={effectiveRoyaltyBps}
              earnings={earnings}
              step={step}
              error={error}
              syncError={syncError}
              isDone={isDone}
              isProcessing={isProcessing}
              tokenId={nft.tokenId}
              onList={handleList}
              onReset={reset}
              onClose={onClose}
            />
          )}
        </div>
      </div>
    </div>
  );
}
