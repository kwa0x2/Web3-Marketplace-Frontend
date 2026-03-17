"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useTrendingCollections } from "@/hooks/useCollections";
import NFTCollectionTable from "@/components/nft/nft-collection-table";

const MAX_TRENDING = 10;

export default function TrendingNFTs() {
  const trendingCollections = useTrendingCollections(MAX_TRENDING);

  return (
    <section className="max-w-[1800px] mx-auto px-8 py-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">
            Trending NFT Collections
          </h2>
          <p className="text-gray-400 mt-1">
            Top performing collections on the marketplace
          </p>
        </div>
        <Link href="/marketplace">
          <Button
            variant="ghost"
            className="text-purple-400 hover:text-purple-300"
          >
            View All →
          </Button>
        </Link>
      </div>

      {trendingCollections.length === 0 ? (
        <div className="text-center text-gray-400 py-12">No collections found</div>
      ) : (
        <NFTCollectionTable
          collections={trendingCollections}
          defaultCurrency="ETH"
          theme="light"
          showCurrencyToggle={true}
          showTimeFilters={true}
          defaultTimeFilter="24h"
        />
      )}
    </section>
  );
}
