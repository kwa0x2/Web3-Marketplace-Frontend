import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { nfts } from "./consts";

export default function TrendingNFTs() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-white">Trending NFTs</h2>
          <p className="text-gray-400 mt-1">Discover unique digital art and collectibles</p>
        </div>
        <Button variant="ghost" className="text-purple-400 hover:text-purple-300">
          View All →
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {nfts.map((item) => (
          <Card key={item.id} className="group cursor-pointer overflow-hidden">
            <div className="aspect-square bg-gradient-to-br from-purple-500/20 to-pink-500/20 relative overflow-hidden">
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition flex items-center justify-center">
                <div className="text-white text-6xl opacity-50">🎨</div>
              </div>
              <Badge className="absolute top-4 right-4">Hot</Badge>
            </div>
            <CardHeader>
              <div className="flex justify-between items-start mb-2">
                <CardTitle className="text-lg">{item.name}</CardTitle>
                <Badge variant="secondary" className="text-xs">{item.type}</Badge>
              </div>
              <CardDescription>
                <div className="flex justify-between items-center mt-3">
                  <div>
                    <div className="text-xs text-gray-500">Price</div>
                    <div className="text-purple-400 font-bold text-lg">{item.price} ETH</div>
                  </div>
                  <Button size="sm" variant="secondary">Buy Now</Button>
                </div>
              </CardDescription>
            </CardHeader>
          </Card>
        ))}
      </div>
    </section>
  );
}
