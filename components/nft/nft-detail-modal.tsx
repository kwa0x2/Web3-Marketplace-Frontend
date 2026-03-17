'use client';

import Image from 'next/image';
import { X, ExternalLink, Copy, Check, Loader2, ShoppingCart, FileText, User, Tag, Link2 } from 'lucide-react';
import { useState } from 'react';
import { useAccount, useReadContract, useChainId } from 'wagmi';
import { parseEther } from 'viem';
import { NFTCardData } from './nft-card';
import { useNFTBuy, useNFTListing } from '@/hooks/useNFTMarketplace';
import { WEB3_MARKETPLACE_NFT_ABI, getNFTContractAddress } from '@/lib/contracts/Web3MarketplaceNFT';
import { Eth } from '@/components/icons/eth';

interface NFTDetailModalProps {
  nft: NFTCardData;
  onClose: () => void;
  onPurchase?: () => void;
}

export function NFTDetailModal({ nft, onClose, onPurchase }: NFTDetailModalProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'details' | 'about'>('details');
  const { address } = useAccount();
  const chainId = useChainId();
  const contractAddress = getNFTContractAddress(chainId);
  const { buy, step: buyStep, error: buyError, reset: resetBuy } = useNFTBuy();
  const { listing, refetch: refetchListing } = useNFTListing(nft.tokenId);

  const { data: onChainOwner, refetch: refetchOwner } = useReadContract({
    address: contractAddress || undefined,
    abi: WEB3_MARKETPLACE_NFT_ABI,
    functionName: 'ownerOf',
    args: nft.tokenId != null ? [BigInt(nft.tokenId)] : undefined,
    query: {
      enabled: nft.tokenId != null && !!contractAddress,
    },
  });

  const ownerAddress = onChainOwner as string | undefined;
  const shortCreator = `${nft.creatorAddress.slice(0, 6)}...${nft.creatorAddress.slice(-4)}`;
  const shortOwner = ownerAddress
    ? `${ownerAddress.slice(0, 6)}...${ownerAddress.slice(-4)}`
    : null;
  const shortContract = nft.contractAddress
    ? `${nft.contractAddress.slice(0, 6)}...${nft.contractAddress.slice(-4)}`
    : null;

  const chainName = nft.chainId === 11155111 ? 'Sepolia' : nft.chainId === 1 ? 'Ethereum' : `Chain ${nft.chainId}`;
  const explorerBase = nft.chainId === 11155111 ? 'https://sepolia.etherscan.io' : 'https://etherscan.io';

  const isListedOnChain = listing?.isListed;
  const displayPrice = isListedOnChain ? listing.priceInEth : nft.price;
  const displayCurrency = nft.currency || 'ETH';
  const isOwner = ownerAddress
    ? address?.toLowerCase() === ownerAddress.toLowerCase()
    : address?.toLowerCase() === nft.creatorAddress.toLowerCase();
  const isBuying = buyStep === 'buying';

  const handleCopy = (addr: string, field: string) => {
    navigator.clipboard.writeText(addr);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleBuy = async () => {
    if (!nft.tokenId) return;

    if (buyStep === 'error') {
      resetBuy();
      return;
    }

    let success = false;
    if (isListedOnChain && listing) {
      success = await buy(nft.tokenId, listing.price);
    } else if (nft.price) {
      success = await buy(nft.tokenId, parseEther(nft.price.toString()));
    }

    if (success) {
      onPurchase?.();
      setTimeout(() => {
        refetchListing();
        refetchOwner();
      }, 2000);
    }
  };

  const CopyBtn = ({ value, field }: { value: string; field: string }) => (
    <button
      onClick={(e) => { e.stopPropagation(); handleCopy(value, field); }}
      className="p-1 hover:bg-white/10 rounded transition-colors"
    >
      {copiedField === field
        ? <Check className="w-3.5 h-3.5 text-green-400" />
        : <Copy className="w-3.5 h-3.5 text-gray-500 hover:text-gray-300" />}
    </button>
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" />

      <div
        className="relative bg-[#0f0f0f] ring-1 ring-white/[0.08] rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-black/40 backdrop-blur-md rounded-full hover:bg-white/10 transition-colors"
        >
          <X className="w-5 h-5 text-white" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.1fr] max-h-[90vh]">
          <div className="relative bg-[#0a0a0a] flex items-center justify-center p-6">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden ring-1 ring-white/[0.06]">
              <Image
                src={nft.fileGatewayUrl}
                alt={nft.name}
                fill
                className="object-cover"
              />
            </div>
            {nft.category && (
              <span className="absolute top-8 left-8 px-2.5 py-1 bg-white/10 backdrop-blur-md rounded-lg text-[11px] font-medium text-white/90 tracking-wide uppercase">
                {nft.category}
              </span>
            )}
          </div>

          <div className="flex flex-col max-h-[90vh] overflow-y-auto">
            <div className="p-6 pb-0">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-bold text-white leading-tight">{nft.name}</h2>
                  <p className="text-sm text-gray-500 mt-1">{chainName}</p>
                </div>
                {nft.tokenId != null && (
                  <span className="text-xs text-gray-600 font-mono bg-white/5 px-2 py-1 rounded-md flex-shrink-0">
                    #{nft.tokenId}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-6 mt-4">
                {ownerAddress && shortOwner && (
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 flex-shrink-0" />
                    <div>
                      <p className="text-[10px] text-gray-600 uppercase tracking-wider">Owner</p>
                      <div className="flex items-center gap-1">
                        <span className="text-white text-xs font-mono">{shortOwner}</span>
                        {isOwner && <span className="text-[10px] text-purple-400">(You)</span>}
                        <CopyBtn value={ownerAddress} field="owner" />
                      </div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] text-gray-600 uppercase tracking-wider">Creator</p>
                    <div className="flex items-center gap-1">
                      <span className="text-white text-xs font-mono">{shortCreator}</span>
                      <CopyBtn value={nft.creatorAddress} field="creator" />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 mt-5">
              {displayPrice != null ? (
                <div className="bg-gradient-to-br from-purple-500/10 to-blue-500/10 ring-1 ring-purple-500/20 rounded-xl p-4">
                  <p className="text-[11px] text-gray-500 uppercase tracking-wider mb-2">Current Price</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Eth className="w-5 h-5 text-purple-400" />
                      <span className="text-3xl font-bold text-white tabular-nums">{displayPrice}</span>
                      <span className="text-gray-400 text-sm self-end mb-1">{displayCurrency}</span>
                    </div>
                    {!isOwner && nft.tokenId != null && (
                      <button
                        onClick={handleBuy}
                        disabled={isBuying || buyStep === 'done'}
                        className="flex items-center gap-2 px-6 py-2.5 bg-purple-600 hover:bg-purple-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-semibold rounded-xl transition-colors text-sm"
                      >
                        {isBuying ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            Buying...
                          </>
                        ) : buyStep === 'done' ? (
                          <>
                            <Check className="w-4 h-4" />
                            Purchased
                          </>
                        ) : buyStep === 'error' ? (
                          'Retry'
                        ) : (
                          <>
                            <ShoppingCart className="w-4 h-4" />
                            Buy Now
                          </>
                        )}
                      </button>
                    )}
                    {isOwner && (
                      <span className="text-xs text-gray-500 bg-white/5 px-3 py-1.5 rounded-lg">You own this</span>
                    )}
                  </div>
                  {buyError && <p className="text-red-400 text-xs mt-2">{buyError}</p>}
                  {buyStep === 'done' && <p className="text-green-400 text-xs mt-2">Purchase successful!</p>}
                </div>
              ) : (
                <div className="bg-white/[0.03] ring-1 ring-white/[0.06] rounded-xl p-4">
                  <p className="text-gray-600 text-sm">Not listed for sale</p>
                </div>
              )}
            </div>

            <div className="px-6 mt-5">
              <div className="flex gap-1 bg-white/[0.03] rounded-lg p-1">
                <button
                  onClick={() => setActiveTab('details')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-medium transition-colors ${
                    activeTab === 'details'
                      ? 'bg-white/10 text-white'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  Details
                </button>
                <button
                  onClick={() => setActiveTab('about')}
                  className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-xs font-medium transition-colors ${
                    activeTab === 'about'
                      ? 'bg-white/10 text-white'
                      : 'text-gray-500 hover:text-gray-300'
                  }`}
                >
                  <User className="w-3.5 h-3.5" />
                  About
                </button>
              </div>
            </div>

            <div className="px-6 py-4 flex-1">
              {activeTab === 'details' && (
                <div className="bg-white/[0.03] rounded-xl ring-1 ring-white/[0.06] divide-y divide-white/[0.06]">
                  {nft.contractAddress && (
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-xs text-gray-500">Contract</span>
                      <div className="flex items-center gap-1.5">
                        <a
                          href={`${explorerBase}/address/${nft.contractAddress}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-purple-400 hover:text-purple-300 font-mono flex items-center gap-1"
                          title={nft.contractAddress}
                        >
                          {shortContract}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                        <CopyBtn value={nft.contractAddress} field="contract" />
                      </div>
                    </div>
                  )}
                  {nft.tokenId != null && (
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-xs text-gray-500">Token ID</span>
                      <span className="text-xs text-white font-mono">{nft.tokenId}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-xs text-gray-500">Standard</span>
                    <span className="text-xs text-white">ERC-721</span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-xs text-gray-500">Chain</span>
                    <span className="text-xs text-white">{chainName}</span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-xs text-gray-500">Royalty</span>
                    <span className="text-xs text-purple-400 font-medium">{nft.royaltyBps / 100}%</span>
                  </div>
                  <div className="flex items-center justify-between px-4 py-3">
                    <span className="text-xs text-gray-500">Metadata</span>
                    <a
                      href={nft.metadataGatewayUrl || nft.fileGatewayUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
                    >
                      IPFS
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  {nft.txHash && (
                    <div className="flex items-center justify-between px-4 py-3">
                      <span className="text-xs text-gray-500">Transaction</span>
                      <a
                        href={`${explorerBase}/tx/${nft.txHash}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1"
                      >
                        Etherscan
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'about' && (
                <div className="bg-white/[0.03] rounded-xl ring-1 ring-white/[0.06] p-4">
                  {nft.description ? (
                    <p className="text-gray-400 text-sm leading-relaxed">{nft.description}</p>
                  ) : (
                    <p className="text-gray-600 text-sm">No description provided.</p>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
