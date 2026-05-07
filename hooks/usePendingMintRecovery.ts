'use client';

import { useEffect, useState } from 'react';
import { usePublicClient } from 'wagmi';
import apiClient from '@/api/axios';

interface PendingMint {
  txHash: `0x${string}`;
  tokenId: number;
  fileUri: string;
  metadataUri: string;
  name: string;
  description?: string;
  royalties: number;
  chainId: number;
  contractAddress: string;
  collectionId?: string | null;
  price?: string | null;
  currency?: string | null;
}

export function usePendingMintRecovery(isAuthenticated: boolean, onRecovered?: () => void) {
  const publicClient = usePublicClient();
  const [recovering, setRecovering] = useState(false);

  useEffect(() => {
    if (!publicClient || !isAuthenticated) return;
    recover();
  }, [publicClient, isAuthenticated]);

  const recover = async () => {
    const keys = Object.keys(localStorage).filter((k) => k.startsWith('pending_mint_'));
    if (keys.length === 0) return;

    setRecovering(true);

    for (const key of keys) {
      try {
        const raw = localStorage.getItem(key);
        if (!raw) { localStorage.removeItem(key); continue; }

        const data: PendingMint = JSON.parse(raw);
        if (!data?.txHash) { localStorage.removeItem(key); continue; }

        const receipt = await publicClient!.getTransactionReceipt({ hash: data.txHash }).catch(() => null);

        // transaction not yet confirmed — leave it for next time
        if (!receipt) continue;

        // transaction failed on-chain — discard
        if (receipt.status !== 'success') { localStorage.removeItem(key); continue; }

        // transaction confirmed — save to backend
        try {
          await apiClient.post('/nft', {
            name: data.name,
            description: data.description || '',
            fileUri: data.fileUri,
            metadataUri: data.metadataUri,
            royalties: data.royalties.toString(),
            chainId: data.chainId.toString(),
            contractAddress: data.contractAddress,
            collectionId: data.collectionId || null,
            price: data.price || null,
            currency: data.currency || null,
            txHash: data.txHash,
            tokenId: data.tokenId,
          });
          localStorage.removeItem(key);
        } catch (err: any) {
          const status = err?.response?.status;
          // 409 = already exists, 400 = bad data → discard
          if (status === 409 || status === 400) localStorage.removeItem(key);
          // 401 = not authenticated → keep for next session
          // other errors → keep and retry next time
        }
      } catch {
        localStorage.removeItem(key);
      }
    }

    setRecovering(false);
    onRecovered?.();
  };

  return { recovering };
}
