import { Card, CardContent } from '@/components/ui/card';
import {
  Wallet,
  ShoppingBag,
  Store,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react';

interface StatsGridProps {
  portfolioValue: string;
  portfolioChange: string;
  nftsOwned: number;
  collectionsCount: number;
  itemsListed: number;
  totalSales: string;
}

export default function StatsGrid({
  portfolioValue,
  portfolioChange,
  nftsOwned,
  collectionsCount,
  itemsListed,
  totalSales,
}: StatsGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="bg-gradient-to-br from-purple-500/10 to-purple-900/10 border-purple-500/20 hover:border-purple-500/40 transition-all">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Portfolio Value</p>
              <p className="text-3xl font-bold text-white mt-2">{portfolioValue}</p>
              <p className="text-xs text-green-400 mt-1 flex items-center gap-1">
                <ArrowUpRight className="w-3 h-3" />
                {portfolioChange} this month
              </p>
            </div>
            <div className="p-3 bg-purple-500/20 rounded-lg">
              <Wallet className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-blue-500/10 to-blue-900/10 border-blue-500/20 hover:border-blue-500/40 transition-all">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">NFTs Owned</p>
              <p className="text-3xl font-bold text-white mt-2">{nftsOwned}</p>
              <p className="text-xs text-gray-400 mt-1">{collectionsCount} collections</p>
            </div>
            <div className="p-3 bg-blue-500/20 rounded-lg">
              <ShoppingBag className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-pink-500/10 to-pink-900/10 border-pink-500/20 hover:border-pink-500/40 transition-all">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Items Listed</p>
              <p className="text-3xl font-bold text-white mt-2">{itemsListed}</p>
              <p className="text-xs text-gray-400 mt-1">{itemsListed} active sales</p>
            </div>
            <div className="p-3 bg-pink-500/20 rounded-lg">
              <Store className="w-6 h-6 text-pink-400" />
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-green-500/10 to-green-900/10 border-green-500/20 hover:border-green-500/40 transition-all">
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-400">Total Sales</p>
              <p className="text-3xl font-bold text-white mt-2">{totalSales}</p>
              <p className="text-xs text-green-400 mt-1">All time</p>
            </div>
            <div className="p-3 bg-green-500/20 rounded-lg">
              <TrendingUp className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
