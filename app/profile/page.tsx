'use client';

import { useAuth } from '@/hooks/useAuth';
import { useAccount } from 'wagmi';
import { AccountInfo } from '@/components/wallet/account_info';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function ProfilePage() {
  const { isConnected, isAuthenticated, authenticate, isLoading, error, address } = useAuth();
  const { chain } = useAccount();

  if (!isConnected) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-black">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Connect Your Wallet</CardTitle>
            <CardDescription>
              Please connect your wallet to access your profile
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-center text-sm text-gray-500 mb-4">
              Use the Connect Wallet button in the navigation to get started.
            </p>
            <Link href="/">
              <Button className="w-full">Go to Home</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-black py-12 px-4">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-white">Profile</h1>
          {isAuthenticated ? (
            <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500">
              Authenticated
            </Badge>
          ) : (
            <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500">
              Not Authenticated
            </Badge>
          )}
        </div>

        <AccountInfo />

        {!isAuthenticated && (
          <Card>
            <CardHeader>
              <CardTitle>Authenticate Your Wallet</CardTitle>
              <CardDescription>
                Sign a message to verify ownership of your wallet and access protected features
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                onClick={authenticate}
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                {isLoading ? 'Signing...' : 'Sign Message to Authenticate'}
              </Button>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500 rounded-md">
                  <p className="text-sm text-red-500">{error}</p>
                </div>
              )}

              <div className="text-sm text-gray-500 space-y-2">
                <p>This will:</p>
                <ul className="list-disc list-inside space-y-1 ml-2">
                  <li>Request a signature from your wallet</li>
                  <li>Not cost any gas fees</li>
                  <li>Not trigger any blockchain transactions</li>
                  <li>Verify you own this wallet address</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        )}

        {isAuthenticated && (
          <>
            <Card>
              <CardHeader>
                <CardTitle>Account Information</CardTitle>
                <CardDescription>
                  Your verified wallet information
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-1">Wallet Address</p>
                      <p className="text-white font-mono text-sm break-all">{address}</p>
                    </div>
                    {chain && (
                      <div>
                        <p className="text-sm text-gray-400 mb-1">Network</p>
                        <p className="text-white">{chain.name}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Marketplace Access</CardTitle>
                <CardDescription>
                  Features available to authenticated users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-gradient-to-r from-purple-500/10 to-blue-500/10 rounded-lg border border-purple-500/20">
                  <h3 className="font-semibold text-white mb-2">Welcome, {address?.slice(0, 6)}...{address?.slice(-4)}</h3>
                  <p className="text-sm text-gray-300">
                    You now have access to all marketplace features including:
                  </p>
                  <ul className="list-disc list-inside text-sm text-gray-300 mt-2 space-y-1">
                    <li>Create and list NFTs</li>
                    <li>Buy and sell digital products</li>
                    <li>Manage your collections</li>
                    <li>Access exclusive features</li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </>
        )}

        <div className="flex justify-center">
          <Link href="/">
            <Button variant="outline">Back to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
