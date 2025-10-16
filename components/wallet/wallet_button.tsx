'use client';

import { useAppKit } from '@reown/appkit/react';
import { useAccount, useDisconnect } from 'wagmi';
import { Button } from '@/components/ui/button';
import { Wallet, LogOut } from 'lucide-react';
import { formatWalletAddress } from '@/lib/utils';

export function WalletButton() {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();



  if (isConnected && address) {
    return (
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          className="flex items-center gap-2"
          onClick={() => open()}
        >
          <Wallet className="h-4 w-4" />
          {formatWalletAddress(address)}
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => disconnect()}
          title="Disconnect Wallet"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    );
  }

  return (
    <Button
      onClick={() => open()}
      className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
    >
      <Wallet className="h-4 w-4" />
      Connect Wallet
    </Button>
  );
}
