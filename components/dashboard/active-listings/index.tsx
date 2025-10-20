import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tag } from 'lucide-react';

interface Listing {
  id: number;
  nftName: string;
  collection: string;
  image: string;
  price: string;
  topOffer: string | null;
  listedDate: string;
}

interface ActiveListingsProps {
  listings: Listing[];
}

export default function ActiveListings({ listings }: ActiveListingsProps) {
  return (
    <Card className="bg-black/40 border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white">Active Listings</CardTitle>
            <CardDescription>Your items for sale</CardDescription>
          </div>
          <Tag className="w-5 h-5 text-gray-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {listings.map((listing) => (
            <div
              key={listing.id}
              className="flex items-center gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
            >
              <img
                src={listing.image}
                alt={listing.nftName}
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <p className="text-white font-medium truncate mb-1">{listing.nftName}</p>
                <p className="text-xs text-gray-400 mb-2">{listing.collection}</p>
                <div className="flex items-center gap-4">
                  <div>
                    <p className="text-xs text-gray-400">Price</p>
                    <p className="text-white font-bold text-sm">{listing.price}</p>
                  </div>
                  {listing.topOffer && (
                    <div>
                      <p className="text-xs text-gray-400">Top Offer</p>
                      <p className="text-green-400 font-bold text-sm">{listing.topOffer}</p>
                    </div>
                  )}
                </div>
              </div>
              <Button variant="outline" size="sm">
                Edit
              </Button>
            </div>
          ))}
        </div>
        <Button variant="outline" className="w-full mt-4">
          List New Item
        </Button>
      </CardContent>
    </Card>
  );
}
