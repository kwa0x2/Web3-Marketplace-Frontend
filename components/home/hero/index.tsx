import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="max-w-[1800px] mx-auto px-8 pt-20 pb-16">
      <div className="text-center">
        <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
          🎨 The Premier NFT Marketplace
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Discover, Collect & Sell
          <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
            Extraordinary NFTs
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Trade unique digital collectibles and NFTs securely on the blockchain. Join the future of digital ownership.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/marketplace">
            <Button size="lg" className="text-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Explore Marketplace
            </Button>
          </Link>
          <Button size="lg" variant="outline" className="text-lg">
            Create NFT
          </Button>
        </div>
      </div>
    </section>
  );
}
