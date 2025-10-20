import { Badge } from '@/components/ui/badge';

interface DashboardHeaderProps {
  address: string | undefined;
  chainName: string | undefined;
}

export default function DashboardHeader({ address, chainName }: DashboardHeaderProps) {
  return (
    <div className="border-b border-white/10 bg-black/20 backdrop-blur-sm">
      <div className="max-w-[1800px] mx-auto px-8 py-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="text-gray-400 mt-1">
              Welcome back, {address?.slice(0, 6)}...{address?.slice(-4)}
            </p>
          </div>
          <Badge className="bg-green-500/20 text-green-400 border-green-500/50">
            {chainName || 'Connected'}
          </Badge>
        </div>
      </div>
    </div>
  );
}
