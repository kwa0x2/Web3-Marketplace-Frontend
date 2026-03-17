'use client';

import { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import { NFTCardData } from '@/components/nft/nft-card';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

interface UseNFTListParams {
  category?: string;
  creator?: string;
  listed?: boolean;
  page?: number;
  limit?: number;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

export function useNFTList(params: UseNFTListParams = {}) {
  const [nfts, setNfts] = useState<NFTCardData[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, totalPages: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNFTs = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const query = new URLSearchParams();
      if (params.category) query.set('category', params.category);
      if (params.creator) query.set('creator', params.creator);
      if (params.listed) query.set('listed', 'true');
      if (params.page) query.set('page', params.page.toString());
      if (params.limit) query.set('limit', params.limit.toString());

      const res = await axios.get(`${API_URL}/nft?${query.toString()}`);
      setNfts(res.data.data);
      setPagination(res.data.pagination);
    } catch (err: any) {
      console.error('Failed to fetch NFTs:', err);
      setError(err.response?.data?.error || 'Failed to fetch NFTs');
    } finally {
      setIsLoading(false);
    }
  }, [params.category, params.creator, params.listed, params.page, params.limit]);

  useEffect(() => {
    fetchNFTs();
  }, [fetchNFTs]);

  return { nfts, pagination, isLoading, error, refetch: fetchNFTs };
}
