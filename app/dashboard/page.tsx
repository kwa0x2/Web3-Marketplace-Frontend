'use client';

import { useAuth } from '@/hooks/useAuth';
import { useAccount } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Navigation } from '@/components/home';
import {
  DashboardHeader,
  StatsGrid,
  MyNFTs,
  RecentActivity,
  ActiveListings,
  QuickActions,
} from '@/components/dashboard';
import { MOCK_ACTIVITIES, MOCK_MY_NFTS, MOCK_ACTIVE_LISTINGS } from '@/lib/mock_data';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function DashboardPage() {
  const { isConnected, isAuthenticated, address } = useAuth();
  const { chain } = useAccount();
  const router = useRouter();

  useEffect(() => {
    if (!isConnected) {
      router.push('/');
    }
  }, [isConnected, router]);

  if (!isConnected) {
    return null;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Authentication Required</CardTitle>
            <CardDescription>
              Please authenticate your wallet to access the dashboard
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/profile">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                Go to Profile & Authenticate
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black">
      <Navigation />

      <DashboardHeader address={address} chainName={chain?.name} />

      <div className="max-w-[1800px] mx-auto px-8 py-8 space-y-8">
        <StatsGrid
          portfolioValue="8.3 ETH"
          portfolioChange="+12.5%"
          nftsOwned={MOCK_MY_NFTS.length}
          collectionsCount={3}
          itemsListed={MOCK_ACTIVE_LISTINGS.length}
          totalSales="15.2 ETH"
        />

        <MyNFTs nfts={MOCK_MY_NFTS} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RecentActivity activities={MOCK_ACTIVITIES} />
          <ActiveListings listings={MOCK_ACTIVE_LISTINGS} />
        </div>

        <QuickActions />
      </div>
    </div>
  );
}
