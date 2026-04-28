'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { NFTCardData } from '@/components/nft/nft-card';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

interface UseMyNFTsParams {
  address?: string;
  type: 'created' | 'collected';
  page?: number;
  limit?: number;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export function useMyNFTs(params: UseMyNFTsParams) {
  const [nfts, setNfts] = useState<NFTCardData[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNFTs = useCallback(async () => {
    if (!params.address) {
      setNfts([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const query = new URLSearchParams();

      if (params.type === 'created') {
        query.set('creator', params.address);
      } else {
        query.set('owner', params.address);
      }

      if (params.page) query.set('page', params.page.toString());
      if (params.limit) query.set('limit', params.limit.toString());

      const res = await axios.get(`${API_URL}/nft?${query.toString()}`);
      setNfts(res.data.data || []);
      setPagination(res.data.pagination || { page: 1, limit: 20, total: 0, totalPages: 0 });
    } catch (err: any) {
      console.error('Failed to fetch my NFTs:', err);
      setError(err.response?.data?.error || 'Failed to fetch NFTs');
    } finally {
      setIsLoading(false);
    }
  }, [params.address, params.type, params.page, params.limit]);

  useEffect(() => {
    fetchNFTs();
  }, [fetchNFTs]);

  return { nfts, pagination, isLoading, error, refetch: fetchNFTs };
}
