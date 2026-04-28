'use client';

import { useState, useEffect, useCallback } from 'react';
import { useChainId, usePublicClient, useAccount } from 'wagmi';
import { formatEther } from 'viem';
import { WEB3_MARKETPLACE_NFT_ABI, getNFTContractAddress } from '@/lib/contracts/Web3MarketplaceNFT';
import { NFTCardData } from '@/components/nft/nft-card';

const IPFS_GATEWAY = 'https://gateway.pinata.cloud/ipfs/';

function ipfsToHttp(uri: string): string {
  if (!uri) return '';
  if (uri.startsWith('ipfs://')) return uri.replace('ipfs://', IPFS_GATEWAY);
  return uri;
}

export function useOwnedNFTs() {
  const chainId = useChainId();
  const { address } = useAccount();
  const publicClient = usePublicClient();
  const [nfts, setNfts] = useState<NFTCardData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchOwnedNFTs = useCallback(async () => {
    if (!address || !publicClient) {
      setNfts([]);
      setIsLoading(false);
      return;
    }

    const contractAddress = getNFTContractAddress(chainId);
    if (!contractAddress) {
      setNfts([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const totalSupply = await publicClient.readContract({
        address: contractAddress,
        abi: WEB3_MARKETPLACE_NFT_ABI,
        functionName: 'totalSupply',
      });

      const total = Number(totalSupply);
      if (total === 0) {
        setNfts([]);
        setIsLoading(false);
        return;
      }

      const ownerCalls = Array.from({ length: total }, (_, i) => ({
        address: contractAddress,
        abi: WEB3_MARKETPLACE_NFT_ABI,
        functionName: 'ownerOf' as const,
        args: [BigInt(i)] as const,
      }));

      const owners = await publicClient.multicall({ contracts: ownerCalls });

      const ownedTokenIds: number[] = [];
      for (let i = 0; i < total; i++) {
        const result = owners[i];
        if (
          result.status === 'success' &&
          (result.result as string).toLowerCase() === address.toLowerCase()
        ) {
          ownedTokenIds.push(i);
        }
      }

      if (ownedTokenIds.length === 0) {
        setNfts([]);
        setIsLoading(false);
        return;
      }

      const detailCalls = ownedTokenIds.flatMap((tokenId) => [
        {
          address: contractAddress,
          abi: WEB3_MARKETPLACE_NFT_ABI,
          functionName: 'tokenURI' as const,
          args: [BigInt(tokenId)] as const,
        },
        {
          address: contractAddress,
          abi: WEB3_MARKETPLACE_NFT_ABI,
          functionName: 'getListing' as const,
          args: [BigInt(tokenId)] as const,
        },
        {
          address: contractAddress,
          abi: WEB3_MARKETPLACE_NFT_ABI,
          functionName: 'royaltyInfo' as const,
          args: [BigInt(tokenId), BigInt(10000)] as const,
        },
      ]);

      const details = await publicClient.multicall({ contracts: detailCalls });

      const nftPromises = ownedTokenIds.map(async (tokenId, idx) => {
        const uriResult = details[idx * 3];
        const listingResult = details[idx * 3 + 1];
        const royaltyResult = details[idx * 3 + 2];

        const tokenURI =
          uriResult.status === 'success' ? (uriResult.result as string) : '';
        const metadataUrl = ipfsToHttp(tokenURI);

        let name = `NFT #${tokenId}`;
        let description = '';
        let image = '';
        let category = '';

        if (metadataUrl) {
          try {
            const res = await fetch(metadataUrl);
            const meta = await res.json();
            name = meta.name || name;
            description = meta.description || '';
            image = meta.image || '';
            category = meta.category || '';
          } catch {
            // metadata fetch failed - use defaults
          }
        }

        let price: number | null = null;
        let currency: string | null = null;
        if (listingResult.status === 'success') {
          const [, listPrice] = listingResult.result as [string, bigint];
          if (listPrice > BigInt(0)) {
            price = parseFloat(formatEther(listPrice));
            currency = 'ETH';
          }
        }

        let royaltyBps = 0;
        if (royaltyResult.status === 'success') {
          const [, royaltyAmount] = royaltyResult.result as [string, bigint];
          royaltyBps = Number(royaltyAmount);
        }

        return {
          id: `chain-${chainId}-${tokenId}`,
          name,
          description,
          category,
          fileGatewayUrl: ipfsToHttp(image),
          royaltyBps,
          creatorAddress: address,
          contractAddress,
          tokenId,
          chainId,
          price,
          currency,
          metadataGatewayUrl: metadataUrl,
        } as NFTCardData;
      });

      const results = await Promise.allSettled(nftPromises);
      const successful = results
        .filter((r): r is PromiseFulfilledResult<NFTCardData> => r.status === 'fulfilled')
        .map((r) => r.value);

      setNfts(successful);
    } catch (err: any) {
      console.error('Failed to fetch on-chain NFTs:', err);
      setError(err.message || 'Failed to fetch NFTs from blockchain');
    } finally {
      setIsLoading(false);
    }
  }, [address, chainId, publicClient]);

  useEffect(() => {
    fetchOwnedNFTs();
  }, [fetchOwnedNFTs]);

  return { nfts, isLoading, error, refetch: fetchOwnedNFTs };
}
