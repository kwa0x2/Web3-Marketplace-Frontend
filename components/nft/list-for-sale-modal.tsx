'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import { X, Loader2, Check, Tag, AlertCircle, ImageIcon, TrendingUp, ArrowRight } from 'lucide-react';
import { NFTCardData } from './nft-card';
import { useNFTList as useNFTListOnChain } from '@/hooks/useNFTMarketplace';
import { useChainId, useAccount } from 'wagmi';
import { getNFTContractAddress } from '@/lib/contracts/Web3MarketplaceNFT';
import { Eth } from '@/components/icons/eth';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

interface ListForSaleModalProps {
  nft: NFTCardData;
  onClose: () => void;
  onSuccess?: () => void;
}

const STEP_LABELS: Record<string, string> = {
  cancelling: 'Removing old listing...',
  approving: 'Approving NFT for marketplace...',
  listing: 'Listing on blockchain...',
  done: 'Success!',
  error: 'Failed',
};

export function ListForSaleModal({ nft, onClose, onSuccess }: ListForSaleModalProps) {
  const chainId = useChainId();
  const { address: walletAddress } = useAccount();
  const contractAddress = getNFTContractAddress(chainId);

  const [price, setPrice] = useState('');
  const [imgError, setImgError] = useState(false);
  const [cancellingListing, setCancellingListing] = useState(false);
  const [backendUpdating, setBackendUpdating] = useState(false);

  const { list, cancel, update, step, error, reset } = useNFTListOnChain();

  const isListed = nft.price != null && nft.price > 0;

  const isCreator = walletAddress?.toLowerCase() === nft.creatorAddress?.toLowerCase();
  const effectiveRoyaltyBps = isCreator ? 0 : (nft.royaltyBps || 0);

  const priceParsed = parseFloat(price || '0');
  const earnings = useMemo(() => {
    if (!priceParsed || priceParsed <= 0) return null;
    const royalty = priceParsed * (effectiveRoyaltyBps / 10000);
    const youReceive = priceParsed - royalty;
    return { royalty, youReceive };
  }, [priceParsed, effectiveRoyaltyBps]);

  const isProcessing = ['cancelling', 'approving', 'listing'].includes(step) || backendUpdating;
  const isDone = step === 'done' && !backendUpdating;

  const syncBackend = async (newPrice: number | null) => {
    setBackendUpdating(true);
    try {
      const url = nft.tokenId != null
        ? `${API_URL}/nft/token/${nft.tokenId}/price`
        : `${API_URL}/nft/${nft.id}/price`;

      await axios.patch(url, {
        price: newPrice,
        currency: newPrice != null ? 'ETH' : null,
      }, { withCredentials: true });
    } catch {
      // On-chain is source of truth
    } finally {
      setBackendUpdating(false);
    }
  };

  const handleList = async () => {
    if (nft.tokenId == null || !price || priceParsed <= 0) return;
    const success = await list(nft.tokenId, price);
    if (success) {
      await syncBackend(priceParsed);
      onSuccess?.();
    }
  };

  const handleUpdate = async () => {
    if (nft.tokenId == null || !price || priceParsed <= 0) return;
    const success = await update(nft.tokenId, price);
    if (success) {
      await syncBackend(priceParsed);
      onSuccess?.();
    }
  };

  const handleCancel = async () => {
    if (nft.tokenId == null) return;
    setCancellingListing(true);
    const success = await cancel(nft.tokenId);
    if (success) {
      await syncBackend(null);
      onSuccess?.();
      onClose();
    }
    setCancellingListing(false);
  };

  const stepLabel = backendUpdating ? 'Updating records...' : STEP_LABELS[step] || '';

  const statusColor = step === 'error' ? 'red' : isDone ? 'green' : 'purple';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div
        className="relative bg-[#0f0f0f] ring-1 ring-white/[0.08] rounded-2xl w-full max-w-md overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
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

        {/* NFT Preview */}
        <div className="px-5 pt-4">
          <div className="flex items-center gap-3.5 bg-white/[0.03] rounded-xl p-3 ring-1 ring-white/[0.06]">
            <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-[#111] flex-shrink-0">
              {imgError ? (
                <div className="absolute inset-0 flex items-center justify-center">
                  <ImageIcon className="w-5 h-5 text-gray-700" />
                </div>
              ) : (
                <Image src={nft.fileGatewayUrl} alt={nft.name} fill className="object-cover" onError={() => setImgError(true)} />
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

        {/* Body */}
        <div className="px-5 py-4 space-y-4">

          {/* ── Manage Listing (already listed) ── */}
          {isListed ? (
            <>
              {/* Update Price */}
              <div>
                <label className="text-xs text-gray-500 uppercase tracking-wider mb-2 block">
                  Update Price
                </label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2">
                    <Eth className="w-4 h-4 text-purple-400" />
                  </div>
                  <input
                    type="number"
                    step="0.001"
                    min="0"
                    placeholder={nft.price?.toString() ?? '0.00'}
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    disabled={isProcessing || isDone}
                    className="w-full bg-white/[0.03] ring-1 ring-white/[0.08] rounded-xl py-3 pl-9 pr-14 text-white text-base font-medium placeholder:text-gray-700 focus:outline-none focus:ring-purple-500/40 transition-all disabled:opacity-50"
                  />
                  <span className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 text-sm">ETH</span>
                </div>
              </div>

              {/* Fee Breakdown */}
              {earnings && (
                <FeeBreakdown
                  price={priceParsed}
                  royaltyBps={effectiveRoyaltyBps}
                  earnings={earnings}
                />
              )}

              {/* Progress */}
              <StatusBanner step={step} label={stepLabel} isDone={isDone} color={statusColor} error={error} />

              {/* Update Button */}
              {isDone ? (
                <button onClick={onClose} className="w-full py-3 rounded-xl font-semibold text-sm bg-green-600 hover:bg-green-500 text-white flex items-center justify-center gap-2 transition-all">
                  <Check className="w-4 h-4" /> Done
                </button>
              ) : (
                <button
                  onClick={step === 'error' ? reset : handleUpdate}
                  disabled={isProcessing || !price || priceParsed <= 0}
                  className="w-full py-3 rounded-xl font-semibold text-sm bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                >
                  {isProcessing ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                  ) : step === 'error' ? 'Try Again' : (
                    <><TrendingUp className="w-4 h-4" /> Update Price</>
                  )}
                </button>
              )}

              {/* Divider */}
              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-white/[0.05]" />
                <span className="text-[11px] text-gray-700">or</span>
                <div className="flex-1 h-px bg-white/[0.05]" />
              </div>

              {/* Cancel Listing */}
              <button
                onClick={handleCancel}
                disabled={cancellingListing || isProcessing}
                className="w-full py-2.5 rounded-xl font-medium text-sm bg-red-500/8 hover:bg-red-500/15 text-red-500 border border-red-500/20 hover:border-red-500/30 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all"
              >
                {cancellingListing ? (
                  <><Loader2 className="w-4 h-4 animate-spin" /> Cancelling...</>
                ) : (
                  <><X className="w-4 h-4" /> Cancel Listing</>
                )}
              </button>
            </>
          ) : (
            /* ── List for Sale (not listed) ── */
            <>
              {/* Price Input */}
              <div className="bg-white/[0.02] ring-1 ring-white/[0.06] rounded-2xl p-4">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-3">Set Price</p>
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-purple-500/10 flex items-center justify-center flex-shrink-0">
                    <Eth className="w-4 h-4 text-purple-400" />
                  </div>
                  <input
                    type="number"
                    step="0.001"
                    min="0"
                    placeholder="0.00"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    disabled={isProcessing || isDone}
                    className="flex-1 bg-transparent text-white text-2xl font-bold placeholder:text-gray-700 focus:outline-none disabled:opacity-50 min-w-0"
                  />
                  <span className="text-gray-500 text-sm font-medium flex-shrink-0">ETH</span>
                </div>

                {/* Quick presets */}
                <div className="flex gap-2 mt-3">
                  {['0.01', '0.05', '0.1', '0.5', '1'].map((preset) => (
                    <button
                      key={preset}
                      onClick={() => setPrice(preset)}
                      disabled={isProcessing || isDone}
                      className={`flex-1 py-1.5 rounded-lg text-xs font-semibold transition-all disabled:opacity-40 ${
                        price === preset
                          ? 'bg-purple-600 text-white'
                          : 'bg-white/[0.04] text-gray-500 hover:bg-white/[0.08] hover:text-gray-300'
                      }`}
                    >
                      {preset}
                    </button>
                  ))}
                </div>
              </div>

              {/* Earnings */}
              {earnings && (
                <div className="bg-white/[0.02] ring-1 ring-white/[0.06] rounded-2xl p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">You receive</span>
                    <div className="flex items-center gap-1.5">
                      <Eth className="w-3.5 h-3.5 text-purple-400" />
                      <span className="text-white font-bold text-lg tabular-nums">
                        {earnings.youReceive.toFixed(4)}
                      </span>
                      <span className="text-gray-500 text-sm">ETH</span>
                    </div>
                  </div>
                  {effectiveRoyaltyBps > 0 && (
                    <p className="text-[11px] text-gray-600 mt-1.5 text-right">
                      After {effectiveRoyaltyBps / 100}% creator royalty
                    </p>
                  )}
                </div>
              )}

              {/* Step Indicator */}
              {(isProcessing || isDone || step === 'error') && (
                <div className="flex items-center gap-2">
                  {[
                    { key: 'approving', label: 'Approve' },
                    { key: 'listing', label: 'List' },
                  ].map((s, i) => {
                    const isActive = step === s.key;
                    const isDoneStep =
                      (s.key === 'approving' && ['listing', 'done'].includes(step)) ||
                      (s.key === 'listing' && step === 'done');
                    return (
                      <div key={s.key} className="flex items-center gap-2 flex-1">
                        <div className={`flex items-center gap-2 flex-1 py-2.5 px-3 rounded-xl ring-1 transition-all ${
                          isDoneStep ? 'bg-green-500/10 ring-green-500/20' :
                          isActive ? 'bg-purple-500/10 ring-purple-500/30' :
                          step === 'error' ? 'bg-red-500/10 ring-red-500/20' :
                          'bg-white/[0.02] ring-white/[0.06]'
                        }`}>
                          <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 ${
                            isDoneStep ? 'bg-green-500' :
                            isActive ? 'bg-purple-500' :
                            step === 'error' ? 'bg-red-500/30' :
                            'bg-white/[0.06]'
                          }`}>
                            {isDoneStep ? (
                              <Check className="w-3 h-3 text-white" />
                            ) : isActive ? (
                              <Loader2 className="w-3 h-3 text-white animate-spin" />
                            ) : (
                              <span className="text-[10px] text-gray-600 font-bold">{i + 1}</span>
                            )}
                          </div>
                          <span className={`text-xs font-medium ${
                            isDoneStep ? 'text-green-400' :
                            isActive ? 'text-purple-300' :
                            'text-gray-600'
                          }`}>{s.label}</span>
                        </div>
                        {i === 0 && (
                          <div className={`w-4 h-px flex-shrink-0 ${
                            ['listing', 'done'].includes(step) ? 'bg-green-500/40' : 'bg-white/[0.06]'
                          }`} />
                        )}
                      </div>
                    );
                  })}
                </div>
              )}

              {step === 'error' && error && (
                <p className="text-red-400 text-xs px-1">{error}</p>
              )}

              {isDone ? (
                <button
                  onClick={onClose}
                  className="w-full py-3.5 rounded-xl font-bold text-sm bg-green-600 hover:bg-green-500 text-white flex items-center justify-center gap-2 transition-all"
                >
                  <Check className="w-4 h-4" /> Listed Successfully
                </button>
              ) : (
                <button
                  onClick={step === 'error' ? reset : handleList}
                  disabled={isProcessing || !price || priceParsed <= 0 || nft.tokenId == null}
                  className="w-full py-3.5 rounded-xl font-bold text-sm bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2 transition-all active:scale-[0.99]"
                >
                  {isProcessing ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Processing...</>
                  ) : step === 'error' ? 'Try Again' : (
                    <><Tag className="w-4 h-4" /> List for Sale</>
                  )}
                </button>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Sub-components ── */

function FeeBreakdown({
  price,
  royaltyBps,
  earnings,
}: {
  price: number;
  royaltyBps: number;
  earnings: { royalty: number; youReceive: number };
}) {
  return (
    <div className="bg-white/[0.02] ring-1 ring-white/[0.06] rounded-xl p-3.5 space-y-2.5">
      <div className="flex items-center justify-between text-xs">
        <span className="text-gray-500">Listing Price</span>
        <span className="text-gray-300 font-medium">{price.toFixed(4)} ETH</span>
      </div>
      {royaltyBps > 0 && (
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500">Creator Royalty ({royaltyBps / 100}%)</span>
          <span className="text-gray-500">− {earnings.royalty.toFixed(4)} ETH</span>
        </div>
      )}
      <div className="flex items-center justify-between text-xs pt-2 border-t border-white/[0.05]">
        <span className="text-white font-semibold flex items-center gap-1.5">
          <ArrowRight className="w-3 h-3 text-purple-400" />
          You receive
        </span>
        <span className="text-purple-300 font-bold">{earnings.youReceive.toFixed(4)} ETH</span>
      </div>
    </div>
  );
}

function StatusBanner({
  step,
  label,
  isDone,
  color,
  error,
}: {
  step: string;
  label: string;
  isDone: boolean;
  color: string;
  error: string | null;
}) {
  const isVisible = ['cancelling', 'approving', 'listing'].includes(step) || isDone || step === 'error';
  if (!isVisible && !error) return null;

  return (
    <>
      {isVisible && (
        <div className={`rounded-xl p-3 flex items-center gap-3 ${
          color === 'red' ? 'bg-red-500/10 ring-1 ring-red-500/20' :
          color === 'green' ? 'bg-green-500/10 ring-1 ring-green-500/20' :
          'bg-purple-500/10 ring-1 ring-purple-500/20'
        }`}>
          {['cancelling', 'approving', 'listing'].includes(step) && (
            <Loader2 className="w-4 h-4 text-purple-400 animate-spin flex-shrink-0" />
          )}
          {isDone && <Check className="w-4 h-4 text-green-400 flex-shrink-0" />}
          {color === 'red' && <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />}
          <span className={`text-sm ${
            color === 'red' ? 'text-red-400' :
            color === 'green' ? 'text-green-400' :
            'text-purple-300'
          }`}>
            {label}
          </span>
        </div>
      )}
      {error && color === 'red' && (
        <p className="text-red-400 text-xs px-1">{error}</p>
      )}
    </>
  );
}
