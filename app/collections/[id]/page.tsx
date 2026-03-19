'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useAccount } from 'wagmi';
import { Navigation } from '@/components/home';
import { NFTCard } from '@/components/nft/nft-card';
import { useCollection } from '@/hooks/useCollections';
import { CollectionHeader, CollectionStats, CollectionAbout, CollectionSkeleton } from '@/components/collection';
import { ArrowLeft, Info, LayoutGrid, Tag, User } from 'lucide-react';

type Tab = 'all' | 'listed' | 'owned' | 'about';

export default function CollectionDetailPage({ params }: { params: { id: string } }) {
  const { id } = params;
  const { collection, isLoading, error } = useCollection(id);
  const { address } = useAccount();
  const [activeTab, setActiveTab] = useState<Tab>('all');

  const filteredNfts = useMemo(() => {
    if (!collection) return [];
    switch (activeTab) {
      case 'listed':
        return collection.nfts.filter((nft) => nft.price != null);
      case 'owned':
        return collection.nfts.filter(
          (nft) => address && nft.creatorAddress.toLowerCase() === address.toLowerCase()
        );
      default:
        return collection.nfts;
    }
  }, [collection, activeTab, address]);

  const tabs: { key: Tab; label: string; icon: React.ReactNode }[] = [
    { key: 'all', label: 'All', icon: <LayoutGrid className="w-4 h-4" /> },
    { key: 'listed', label: 'Listed', icon: <Tag className="w-4 h-4" /> },
    { key: 'owned', label: 'Owned by you', icon: <User className="w-4 h-4" /> },
    { key: 'about', label: 'About', icon: <Info className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <div className="max-w-[1800px] mx-auto px-8 py-6">
        <Link
          href="/marketplace"
          className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm">Back to Marketplace</span>
        </Link>

        {isLoading ? (
          <CollectionSkeleton />
        ) : error ? (
          <div className="text-center py-20">
            <p className="text-red-400">{error}</p>
          </div>
        ) : collection ? (
          <>
            <CollectionHeader collection={collection} />
            <CollectionStats stats={collection.stats} />

            <div className="flex items-center gap-2 mb-6 border-b border-white/[0.06] pb-px">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                    activeTab === tab.key
                      ? 'text-white border-purple-500'
                      : 'text-gray-500 border-transparent hover:text-gray-300'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  {tab.key === 'all' && (
                    <span className="text-xs text-gray-600 ml-1">{collection.nfts.length}</span>
                  )}
                  {tab.key === 'listed' && (
                    <span className="text-xs text-gray-600 ml-1">{collection.stats.listedCount}</span>
                  )}
                </button>
              ))}
            </div>

            {activeTab === 'about' ? (
              <CollectionAbout collection={collection} />
            ) : filteredNfts.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">
                  {activeTab === 'owned'
                    ? 'You don\'t own any NFTs in this collection'
                    : activeTab === 'listed'
                      ? 'No listed NFTs in this collection'
                      : 'No NFTs in this collection yet'}
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5">
                {filteredNfts.map((nft) => (
                  <NFTCard key={nft.id} nft={nft} />
                ))}
              </div>
            )}
          </>
        ) : null}
      </div>
    </div>
  );
}
