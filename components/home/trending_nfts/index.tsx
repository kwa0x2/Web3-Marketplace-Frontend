"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { MOCK_NFT_COLLECTIONS } from "@/lib/mock_data";
import NFTCollectionTable from "@/components/shared/nft-collection-table";

export default function TrendingNFTs() {
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

      {/* Collections Table */}
      <NFTCollectionTable
        collections={MOCK_NFT_COLLECTIONS}
        defaultCurrency="ETH"
        theme="light"
        showCurrencyToggle={true}
        showTimeFilters={true}
        defaultTimeFilter="24h"
      />
    </section>
  );
}
