'use client';

import { useAccount, useBalance, useEnsName } from 'wagmi';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function AccountInfo() {
  const { address, isConnected, chain } = useAccount();
  const { data: ensName } = useEnsName({ address });
  const { data: balance } = useBalance({ address });

  if (!isConnected || !address) {
    return null;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Wallet Information</CardTitle>
        <CardDescription>Your connected wallet details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Address</p>
          <p className="text-sm font-mono">{address}</p>
        </div>

        {ensName && (
          <div>
            <p className="text-sm font-medium text-gray-500">ENS Name</p>
            <p className="text-sm">{ensName}</p>
          </div>
        )}

        {balance && (
          <div>
            <p className="text-sm font-medium text-gray-500">Balance</p>
            <p className="text-sm">
              {parseFloat(balance.formatted).toFixed(4)} {balance.symbol}
            </p>
          </div>
        )}

        {chain && (
          <div>
            <p className="text-sm font-medium text-gray-500">Network</p>
            <Badge variant="outline">{chain.name}</Badge>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
