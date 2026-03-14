interface CreatorInfoProps {
  address?: string;
}

export function CreatorInfo({ address }: CreatorInfoProps) {
  return (
    <div className="flex items-center space-x-3 pt-3 border-t border-gray-700/50">
      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-semibold">
        {address?.slice(2, 4).toUpperCase()}
      </div>
      <div className="flex-1">
        <p className="text-xs text-gray-500">Creator</p>
        <p className="text-sm text-white font-medium">
          {address ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'You'}
        </p>
      </div>
    </div>
  );
}
