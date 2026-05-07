'use client';

import { useState, useEffect, useCallback } from 'react';
import apiClient from '@/api/axios';
import { NFTCardData } from '@/components/nft/nft-card';

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export function useProfileNFTs() {
  const [nfts, setNfts] = useState<NFTCardData[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNFTs = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await apiClient.get('/nft/mine');
      setNfts(res.data.data || []);
      setPagination(res.data.pagination || { page: 1, limit: 20, total: 0, totalPages: 0 });
    } catch (err: any) {
      const raw = err.response?.data?.error || 'Failed to fetch NFTs';
      setError(raw === 'No session found' || raw === 'Invalid or expired session'
        ? 'Session not found. Please verify your wallet or logout and login again.'
        : raw);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNFTs();
  }, [fetchNFTs]);

  return { nfts, pagination, isLoading, error, refetch: fetchNFTs };
}
