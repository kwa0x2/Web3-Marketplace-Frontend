'use client';

import { useState } from 'react';
import { useWriteContract, useReadContract, useChainId, useAccount } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { WEB3_MARKETPLACE_NFT_ABI, getNFTContractAddress } from '@/lib/contracts/Web3MarketplaceNFT';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export type BuyStep = 'idle' | 'buying' | 'done' | 'error';
export type ListStep = 'idle' | 'approving' | 'listing' | 'done' | 'error';

export function useNFTBuy() {
  const chainId = useChainId();
  const { address } = useAccount();
  const [step, setStep] = useState<BuyStep>('idle');
  const [error, setError] = useState<string | null>(null);
  const { writeContractAsync } = useWriteContract();

  const buy = async (tokenId: number, priceInWei: bigint) => {
    const contractAddress = getNFTContractAddress(chainId);
    if (!contractAddress) {
      setError('Contract not deployed on this network');
      setStep('error');
      return false;
    }

    setStep('buying');
    setError(null);

    try {
      await writeContractAsync({
        address: contractAddress,
        abi: WEB3_MARKETPLACE_NFT_ABI,
        functionName: 'buyItem',
        args: [BigInt(tokenId)],
        value: priceInWei,
      });

      // Update backend: clear listing, set new owner
      try {
        await axios.patch(`${API_URL}/nft/token/${tokenId}/sold`, {
          buyerAddress: address,
        }, { withCredentials: true });
      } catch {
        // Non-critical: on-chain is the source of truth
      }

      setStep('done');
      return true;
    } catch (err: any) {
      const message = err?.shortMessage || err?.message || 'Failed to buy NFT';
      setError(message);
      setStep('error');
      return false;
    }
  };

  const reset = () => {
    setStep('idle');
    setError(null);
  };

  return { buy, step, error, reset };
}

export function useNFTList() {
  const chainId = useChainId();
  const [step, setStep] = useState<ListStep>('idle');
  const [error, setError] = useState<string | null>(null);
  const { writeContractAsync } = useWriteContract();

  const list = async (tokenId: number, priceInEth: string) => {
    const contractAddress = getNFTContractAddress(chainId);
    if (!contractAddress) {
      setError('Contract not deployed on this network');
      setStep('error');
      return false;
    }

    setStep('approving');
    setError(null);

    try {
      await writeContractAsync({
        address: contractAddress,
        abi: WEB3_MARKETPLACE_NFT_ABI,
        functionName: 'approve',
        args: [contractAddress, BigInt(tokenId)],
      });

      setStep('listing');

      const priceInWei = parseEther(priceInEth);
      await writeContractAsync({
        address: contractAddress,
        abi: WEB3_MARKETPLACE_NFT_ABI,
        functionName: 'listItem',
        args: [BigInt(tokenId), priceInWei],
      });

      setStep('done');
      return true;
    } catch (err: any) {
      const message = err?.shortMessage || err?.message || 'Failed to list NFT';
      setError(message);
      setStep('error');
      return false;
    }
  };

  const cancel = async (tokenId: number) => {
    const contractAddress = getNFTContractAddress(chainId);
    if (!contractAddress) {
      setError('Contract not deployed on this network');
      setStep('error');
      return false;
    }

    setStep('idle');
    setError(null);

    try {
      await writeContractAsync({
        address: contractAddress,
        abi: WEB3_MARKETPLACE_NFT_ABI,
        functionName: 'cancelListing',
        args: [BigInt(tokenId)],
      });

      return true;
    } catch (err: any) {
      const message = err?.shortMessage || err?.message || 'Failed to cancel listing';
      setError(message);
      setStep('error');
      return false;
    }
  };

  const reset = () => {
    setStep('idle');
    setError(null);
  };

  return { list, cancel, step, error, reset };
}

export function useNFTListing(tokenId: number | null | undefined) {
  const chainId = useChainId();
  const contractAddress = getNFTContractAddress(chainId);

  const { data, refetch } = useReadContract({
    address: contractAddress || undefined,
    abi: WEB3_MARKETPLACE_NFT_ABI,
    functionName: 'getListing',
    args: tokenId != null ? [BigInt(tokenId)] : undefined,
    query: {
      enabled: tokenId != null && !!contractAddress,
    },
  });

  const listing = data
    ? {
        seller: data[0] as string,
        price: data[1] as bigint,
        isListed: (data[1] as bigint) > 0n,
        priceInEth: formatEther(data[1] as bigint),
      }
    : null;

  return { listing, refetch };
}
