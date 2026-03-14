interface WalletInfoProps {
  address?: string;
}

export function WalletInfo({ address }: WalletInfoProps) {
  return (
    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-400 mb-1">Connected Wallet</p>
          <p className="text-white font-mono text-sm">
            {address?.slice(0, 6)}...{address?.slice(-4)}
          </p>
        </div>
        <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-green-500"></div>
        </div>
      </div>
    </div>
  );
}
