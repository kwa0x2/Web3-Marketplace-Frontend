import { CollectionStats as Stats } from '@/hooks/useCollections';
import { Eth } from '@/components/icons/eth';
import { StatCard } from './stat-card';

export function CollectionStats({ stats }: { stats: Stats }) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
      <StatCard
        label="Floor Price"
        value={
          <div className="flex items-center gap-1.5">
            <Eth className="w-4 h-4 text-purple-400" />
            <span>{stats.floorPrice || '—'}</span>
            <span className="text-gray-500 text-xs font-normal">ETH</span>
          </div>
        }
      />
      <StatCard
        label="Total Volume"
        value={
          <div className="flex items-center gap-1.5">
            <Eth className="w-4 h-4 text-purple-400" />
            <span>{stats.totalVolume || '—'}</span>
            <span className="text-gray-500 text-xs font-normal">ETH</span>
          </div>
        }
      />
      <StatCard label="Items" value={stats.totalItems} />
      <StatCard label="Listed" value={`${stats.listedCount} / ${stats.totalItems}`} />
    </div>
  );
}
