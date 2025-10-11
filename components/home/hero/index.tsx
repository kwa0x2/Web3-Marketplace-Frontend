import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function Hero() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
      <div className="text-center">
        <Badge variant="secondary" className="mb-6 text-sm px-4 py-2">
          🚀 NFTs, APIs, Digital Products & More
        </Badge>
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
          Buy & Sell Digital Assets
          <span className="block bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent mt-2">
            On The Blockchain
          </span>
        </h1>
        <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
          Trade NFTs, API access, software licenses, and digital products securely with blockchain technology.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" variant="secondary" className="text-lg">
            Browse Marketplace
          </Button>
          <Button size="lg" variant="outline" className="text-lg">
            Start Selling
          </Button>
        </div>
      </div>
    </section>
  );
}
