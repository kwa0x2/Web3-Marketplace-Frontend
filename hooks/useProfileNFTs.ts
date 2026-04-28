'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { NFTCardData } from '@/components/nft/nft-card';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

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
      const res = await axios.get(`${API_URL}/nft/mine`, { withCredentials: true });
      setNfts(res.data.data || []);
      setPagination(res.data.pagination || { page: 1, limit: 20, total: 0, totalPages: 0 });
    } catch (err: any) {
      setError(err.response?.data?.error || 'Failed to fetch NFTs');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchNFTs();
  }, [fetchNFTs]);

  return { nfts, pagination, isLoading, error, refetch: fetchNFTs };
}
