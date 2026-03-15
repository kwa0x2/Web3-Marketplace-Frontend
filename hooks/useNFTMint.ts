import { useState } from 'react';
import { useWriteContract, useChainId } from 'wagmi';
import { WEB3_MARKETPLACE_NFT_ABI, getNFTContractAddress } from '@/lib/contracts/Web3MarketplaceNFT';
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export type MintStep = 'idle' | 'uploading' | 'minting' | 'confirming' | 'done' | 'error';

interface MintParams {
  file: File;
  name: string;
  description?: string;
  category?: string;
  royalties: number; // percentage (e.g. 10 for 10%)
  properties?: Array<{ trait_type: string; value: string }>;
}

interface MintResult {
  tokenId?: string;
  metadataUri?: string;
  fileUri?: string;
  txHash?: string;
}

export function useNFTMint() {
  const chainId = useChainId();
  const [step, setStep] = useState<MintStep>('idle');
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<MintResult | null>(null);

  const { writeContractAsync } = useWriteContract();

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
      formData.append('chainId', chainId.toString());
      formData.append('contractAddress', contractAddress);
      if (params.properties && params.properties.length > 0) {
        formData.append('properties', JSON.stringify(params.properties));
      }

      const uploadRes = await axios.post(`${API_URL}/nft/upload`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      const { id: nftId, metadataUri } = uploadRes.data.data;

      setStep('minting');
      const royaltyBps = BigInt(Math.round(params.royalties * 100));

      const txHash = await writeContractAsync({
        address: contractAddress,
        abi: WEB3_MARKETPLACE_NFT_ABI,
        functionName: 'mint',
        args: [metadataUri, royaltyBps],
      });

      setStep('confirming');

      await axios.patch(`${API_URL}/nft/${nftId}/mint`, { txHash }, {
        withCredentials: true,
      });

      const mintResult: MintResult = {
        metadataUri,
        fileUri: uploadRes.data.data.fileUri,
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
