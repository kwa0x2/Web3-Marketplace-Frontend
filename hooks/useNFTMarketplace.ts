'use client';

import { useState } from 'react';
import { useWriteContract, useReadContract, useChainId, useAccount, usePublicClient } from 'wagmi';
import { parseEther, formatEther } from 'viem';
import { waitForReceipt } from '@/lib/wait-for-receipt';
import { WEB3_MARKETPLACE_NFT_ABI, getNFTContractAddress } from '@/lib/contracts/Web3MarketplaceNFT';
import apiClient from '@/api/axios';

export type BuyStep = 'idle' | 'buying' | 'done' | 'error';
export type ListStep = 'idle' | 'cancelling' | 'approving' | 'listing' | 'done' | 'error';

export function useNFTBuy() {
  const chainId = useChainId();
  const publicClient = usePublicClient();
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
      // Simulate first to surface revert reasons before MetaMask prompt
      await publicClient!.simulateContract({
        address: contractAddress,
        abi: WEB3_MARKETPLACE_NFT_ABI,
        functionName: 'buyItem',
        args: [BigInt(tokenId)],
        value: priceInWei,
        account: address,
      });

      const tx = await writeContractAsync({
        address: contractAddress,
        abi: WEB3_MARKETPLACE_NFT_ABI,
        functionName: 'buyItem',
        args: [BigInt(tokenId)],
        value: priceInWei,
      });

      await waitForReceipt(publicClient!, tx, 'Purchase');

      try {
        await apiClient.patch(`/nft/token/${tokenId}/sold`, {
          buyerAddress: address,
        });
      } catch {
        // Non-critical: on-chain is the source of truth
      }

      setStep('done');
      return true;
    } catch (err: any) {
      const revertReason = err?.cause?.reason || err?.cause?.shortMessage;
      const message = revertReason
        ? `Transaction failed: ${revertReason}`
        : err?.shortMessage || err?.message || 'Failed to buy NFT';
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
  const publicClient = usePublicClient();
  const { address } = useAccount();
  const [step, setStep] = useState<ListStep>('idle');
  const [error, setError] = useState<string | null>(null);
  const { writeContractAsync } = useWriteContract();

  const list = async (tokenId: number, priceInEth: string) => {
    const contractAddress = getNFTContractAddress(chainId);
    if (!contractAddress) {
      setError('Contract not deployed on this network.');
      setStep('error');
      return false;
    }

    setStep('approving');
    setError(null);

    try {
      const approveTx = await writeContractAsync({
        address: contractAddress,
        abi: WEB3_MARKETPLACE_NFT_ABI,
        functionName: 'approve',
        args: [contractAddress, BigInt(tokenId)],
      });
      await waitForReceipt(publicClient!, approveTx, 'Approval');

      setStep('listing');

      const listTx = await writeContractAsync({
        address: contractAddress,
        abi: WEB3_MARKETPLACE_NFT_ABI,
        functionName: 'listItem',
        args: [BigInt(tokenId), parseEther(priceInEth)],
      });
      await waitForReceipt(publicClient!, listTx, 'Listing');

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

    setStep('cancelling');
    setError(null);

    try {
      const tx = await writeContractAsync({
        address: contractAddress,
        abi: WEB3_MARKETPLACE_NFT_ABI,
        functionName: 'cancelListing',
        args: [BigInt(tokenId)],
      });
      await waitForReceipt(publicClient!, tx, 'Cancel listing');

      return true;
    } catch (err: any) {
      const message = err?.shortMessage || err?.message || 'Failed to cancel listing';
      setError(message);
      setStep('error');
      return false;
    }
  };

  const update = async (tokenId: number, newPriceInEth: string) => {
    const contractAddress = getNFTContractAddress(chainId);
    if (!contractAddress) {
      setError('Contract not deployed on this network');
      setStep('error');
      return false;
    }

    setStep('listing');
    setError(null);

    try {
      await publicClient!.simulateContract({
        address: contractAddress,
        abi: WEB3_MARKETPLACE_NFT_ABI,
        functionName: 'listItem',
        args: [BigInt(tokenId), parseEther(newPriceInEth)],
        account: address,
      });

      const listTx = await writeContractAsync({
        address: contractAddress,
        abi: WEB3_MARKETPLACE_NFT_ABI,
        functionName: 'listItem',
        args: [BigInt(tokenId), parseEther(newPriceInEth)],
      });

      await waitForReceipt(publicClient!, listTx, 'Price update');

      setStep('done');
      return true;
    } catch (err: any) {
      const revertReason = err?.cause?.reason || err?.cause?.shortMessage;
      const message = revertReason
        ? `Transaction failed: ${revertReason}`
        : err?.shortMessage || err?.message || 'Failed to update listing';
      setError(message);
      setStep('error');
      return false;
    }
  };

  const reset = () => {
    setStep('idle');
    setError(null);
  };

  return { list, cancel, update, step, error, reset };
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
        isListed: (data[1] as bigint) > BigInt(0),
        priceInEth: formatEther(data[1] as bigint),
      }
    : null;

  return { listing, refetch };
}
