'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import axios from 'axios';
import { MOCK_NFT_COLLECTIONS, NFTCollection } from '@/lib/mock_data';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

export interface CollectionData {
  id: string;
  name: string;
  symbol: string;
  description?: string | null;
  image?: string | null;
  verified: boolean;
  ownerAddress: string;
  itemCount: number;
  floorPrice: number;
  listedCount: number;
  ownerCount: number;
  createdAt: string;
}

export function useCollections() {
  const [collections, setCollections] = useState<CollectionData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCollections = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_URL}/collection`);
      setCollections(res.data.data);
    } catch (err: any) {
      console.error('Failed to fetch collections:', err);
      setError(err.response?.data?.error || 'Failed to fetch collections');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCollections();
  }, [fetchCollections]);

  return { collections, isLoading, error, refetch: fetchCollections };
}

export function useMyCollections() {
  const [collections, setCollections] = useState<{ id: string; name: string; symbol: string; image?: string | null; itemCount: number }[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchMyCollections = useCallback(async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${API_URL}/collection/my`, { withCredentials: true });
      setCollections(res.data.data);
    } catch {
      // not logged in or no collections
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchMyCollections();
  }, [fetchMyCollections]);

  return { collections, isLoading, refetch: fetchMyCollections };
}

export interface CollectionStats {
  totalItems: number;
  listedCount: number;
  ownerCount: number;
  floorPrice: number;
  totalVolume: number;
}

export interface CollectionDetail {
  id: string;
  name: string;
  symbol: string;
  description?: string | null;
  image?: string | null;
  banner?: string | null;
  verified: boolean;
  ownerAddress: string;
  owner?: { address: string; avatar?: string | null };
  nfts: import('@/components/nft/nft-card').NFTCardData[];
  stats: CollectionStats;
}

export function useCollection(id: string) {
  const [collection, setCollection] = useState<CollectionDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCollection = useCallback(async () => {
    if (!id) return;
    setIsLoading(true);
    setError(null);
    try {
      const res = await axios.get(`${API_URL}/collection/${id}`);
      setCollection(res.data.data);
    } catch (err: any) {
      console.error('Failed to fetch collection:', err);
      setError(err.response?.data?.error || 'Failed to fetch collection');
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchCollection();
  }, [fetchCollection]);

  return { collection, isLoading, error, refetch: fetchCollection };
}

export function useTrendingCollections(limit?: number) {
  const { collections } = useCollections();

  const trendingCollections: NFTCollection[] = useMemo(() => {
    const examples = MOCK_NFT_COLLECTIONS;

    const real: NFTCollection[] = collections.map((c, i) => ({
      id: examples.length + i + 1,
      dbId: c.id,
      name: c.name,
      verified: c.verified,
      image: c.image || `https://placehold.co/50x50/6366f1/ffffff?text=${c.symbol}&font=roboto`,
      floorPrice: c.floorPrice,
      floorChange24h: null,
      topOffer: null,
      sales24h: c.listedCount,
      owners: c.ownerCount,
      listed: c.itemCount > 0 ? parseFloat(((c.listedCount / c.itemCount) * 100).toFixed(1)) : 0,
      volume24h: c.floorPrice * c.listedCount,
      volumeChange24h: 0,
    }));

    const all = [...examples, ...real];
    return limit ? all.slice(0, limit) : all;
  }, [collections, limit]);

  return trendingCollections;
}
