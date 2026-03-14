interface NetworkInfoProps {
  chainName?: string;
  chainIcon?: string;
}

export function NetworkInfo({ chainName, chainIcon }: NetworkInfoProps) {
  return (
    <div className="relative overflow-hidden bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl p-5 border border-purple-500/30">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-2xl shadow-lg shadow-purple-500/30">
            {chainIcon}
          </div>
          <div>
            <p className="text-xs text-purple-300 font-medium mb-1">Network</p>
            <p className="text-white font-bold text-lg">{chainName}</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
          <span className="text-green-400 text-sm font-semibold">Connected</span>
        </div>
      </div>
    </div>
  );
}
