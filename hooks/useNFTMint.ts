import { useState } from 'react';
import { useWriteContract, useChainId, usePublicClient, useAccount } from 'wagmi';
import { parseEther, parseEventLogs } from 'viem';
import { waitForReceipt } from '@/lib/wait-for-receipt';
import { WEB3_MARKETPLACE_NFT_ABI, getNFTContractAddress } from '@/lib/contracts/Web3MarketplaceNFT';
import apiClient from '@/api/axios';

export type MintStep = 'idle' | 'uploading' | 'minting' | 'confirming' | 'approving' | 'listing' | 'saving' | 'done' | 'error';

interface MintParams {
  file: File;
  name: string;
  description?: string;
  category?: string;
  collectionId?: string;
  royalties: number; // percentage (e.g. 10 for 10%)
  properties?: Array<{ trait_type: string; value: string }>;
  price?: string;
  currency?: string;
}

interface MintResult {
  tokenId?: number;
  metadataUri?: string;
  fileUri?: string;
  txHash?: string;
}

export function useNFTMint() {
  const chainId = useChainId();
  const { address: walletAddress } = useAccount();
  const [step, setStep] = useState<MintStep>('idle');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MintResult | null>(null);

  const { writeContractAsync } = useWriteContract();
  const publicClient = usePublicClient();

  const mint = async (params: MintParams): Promise<MintResult | null> => {
    const contractAddress = getNFTContractAddress(chainId);
    if (!contractAddress || contractAddress === '0x0000000000000000000000000000000000000000') {
      setError(`NFT contract not deployed on this network (chainId: ${chainId}). Deploy to Sepolia first.`);
      setStep('error');
      return null;
    }

    setStep('uploading');
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', params.file);
      formData.append('name', params.name);
      formData.append('description', params.description || '');
      formData.append('category', params.category || '');
      formData.append('royalties', params.royalties.toString());
      if (params.properties && params.properties.length > 0) {
        formData.append('properties', JSON.stringify(params.properties));
      }

      const uploadRes = await apiClient.post('/nft/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { fileUri, metadataUri } = uploadRes.data.data;

      setStep('minting');
      const royaltyBps = BigInt(Math.round(params.royalties * 100));

      const txHash = await writeContractAsync({
        address: contractAddress,
        abi: WEB3_MARKETPLACE_NFT_ABI,
        functionName: 'mint',
        args: [metadataUri, royaltyBps],
      });

      setStep('confirming');

      const pendingKey = `pending_mint_${txHash}`;
      localStorage.setItem(pendingKey, JSON.stringify({
        txHash, fileUri, metadataUri,
        name: params.name, description: params.description,
        royalties: params.royalties, chainId, contractAddress,
        collectionId: params.collectionId, price: params.price, currency: params.currency,
      }));

      const mintReceipt = await waitForReceipt(publicClient!, txHash, 'Mint');

      // Read actual tokenId from the NFTMinted event — avoids race conditions from pre-computing totalSupply
      const mintedLogs = parseEventLogs({
        abi: WEB3_MARKETPLACE_NFT_ABI,
        eventName: 'NFTMinted',
        logs: mintReceipt.logs,
      });
      const tokenId = mintedLogs[0]?.args?.tokenId != null
        ? Number(mintedLogs[0].args.tokenId)
        : null;

      if (tokenId == null) throw new Error('Could not determine minted token ID from receipt');

      if (params.price && parseFloat(params.price) > 0) {
        const isApproved = await publicClient!.readContract({
          address: contractAddress,
          abi: WEB3_MARKETPLACE_NFT_ABI,
          functionName: 'isApprovedForAll',
          args: [walletAddress!, contractAddress],
        });

        if (!isApproved) {
          setStep('approving');
          const approveTx = await writeContractAsync({
            address: contractAddress,
            abi: WEB3_MARKETPLACE_NFT_ABI,
            functionName: 'setApprovalForAll',
            args: [contractAddress, true],
          });
          await waitForReceipt(publicClient!, approveTx, 'Approval');
        }

        setStep('listing');
        const priceInWei = parseEther(params.price);

        await publicClient!.simulateContract({
          address: contractAddress,
          abi: WEB3_MARKETPLACE_NFT_ABI,
          functionName: 'listItem',
          args: [BigInt(tokenId), priceInWei],
          account: walletAddress,
        });

        const listTx = await writeContractAsync({
          address: contractAddress,
          abi: WEB3_MARKETPLACE_NFT_ABI,
          functionName: 'listItem',
          args: [BigInt(tokenId), priceInWei],
        });
        await waitForReceipt(publicClient!, listTx, 'Listing');
      }

      setStep('saving');
      await apiClient.post('/nft', {
        name: params.name,
        description: params.description || '',
        category: params.category || '',
        fileUri,
        metadataUri,
        royalties: params.royalties.toString(),
        chainId: chainId.toString(),
        contractAddress,
        collectionId: params.collectionId || null,
        price: params.price || null,
        currency: params.currency || null,
        txHash,
        tokenId,
      });

      localStorage.removeItem(pendingKey);

      const mintResult: MintResult = {
        tokenId,
        metadataUri,
        fileUri,
        txHash,
      };

      setResult(mintResult);
      setStep('done');
      return mintResult;
    } catch (err: any) {
      console.error('Mint error:', err);
      const message =
        err?.response?.data?.error ||
        err?.shortMessage ||
        err?.message ||
        'Failed to create NFT';
      setError(message);
      setStep('error');
      return null;
    }
  };

  const reset = () => {
    setStep('idle');
    setError(null);
    setResult(null);
  };

  return { mint, step, error, result, reset };
}
