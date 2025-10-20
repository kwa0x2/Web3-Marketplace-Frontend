import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';

interface NFT {
  id: number;
  name: string;
  collection: string;
  image: string;
  price: string;
  priceChange: number;
}

interface MyNFTsProps {
  nfts: NFT[];
}

export default function MyNFTs({ nfts }: MyNFTsProps) {
  return (
    <Card className="bg-black/40 border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white">My NFTs</CardTitle>
            <CardDescription>Your collected NFTs</CardDescription>
          </div>
          <Button variant="outline" size="sm">
            View All
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {nfts.map((nft) => (
            <div
              key={nft.id}
              className="bg-white/5 rounded-lg overflow-hidden hover:bg-white/10 transition-all cursor-pointer group"
            >
              <div className="relative aspect-square">
                <img
                  src={nft.image}
                  alt={nft.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <p className="text-xs text-gray-400 mb-1">{nft.collection}</p>
                <h3 className="text-white font-semibold mb-2 truncate">{nft.name}</h3>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400">Floor Price</p>
                    <p className="text-white font-bold">{nft.price}</p>
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${
                    nft.priceChange > 0 ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {nft.priceChange > 0 ? (
                      <ArrowUpRight className="w-3 h-3" />
                    ) : (
                      <ArrowDownRight className="w-3 h-3" />
                    )}
                    {Math.abs(nft.priceChange)}%
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
