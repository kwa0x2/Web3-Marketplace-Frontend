'use client';

import { useState } from 'react';
import { Navigation } from '@/components/home';
import { useNFTList } from '@/hooks/useNFTList';
import { useCollections } from '@/hooks/useCollections';
import {
  MarketplaceHero,
  MarketplaceTabs,
  MarketplaceTab,
  NFTTab,
  CollectionsTab,
} from '@/components/marketplace';

export default function MarketplacePage() {
  const [activeTab, setActiveTab] = useState<MarketplaceTab>('nfts');
  const [page, setPage] = useState(1);

  const { nfts, pagination, isLoading: nftsLoading, error: nftsError } = useNFTList({
    listed: true,
    page,
    limit: 20,
  });

  const { collections, isLoading: collectionsLoading, error: collectionsError } = useCollections();

  const handleTabChange = (tab: MarketplaceTab) => {
    setActiveTab(tab);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-black">
      <Navigation />

      <MarketplaceHero
        nftCount={pagination.total}
        collectionCount={collections.length}
        isLoading={nftsLoading || collectionsLoading}
      />

      <div className="max-w-[1800px] mx-auto px-6 md:px-8 py-8">
        <MarketplaceTabs
          activeTab={activeTab}
          nftCount={pagination.total}
          collectionCount={collections.length}
          onChange={handleTabChange}
        />

        {activeTab === 'nfts' && (
          <NFTTab
            nfts={nfts}
            pagination={pagination}
            isLoading={nftsLoading}
            error={nftsError}
            page={page}
            onPageChange={setPage}
          />
        )}

        {activeTab === 'collections' && (
          <CollectionsTab
            collections={collections}
            isLoading={collectionsLoading}
            error={collectionsError}
          />
        )}
      </div>
    </div>
  );
}
