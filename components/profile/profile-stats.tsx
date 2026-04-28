import { ShoppingBag, Tag } from 'lucide-react';

interface ProfileStatsProps {
  ownedCount: number;
  listedCount: number;
  isLoading: boolean;
}

export function ProfileStats({ ownedCount, listedCount, isLoading }: ProfileStatsProps) {
  const stats = [
    { label: 'Owned', value: ownedCount, icon: ShoppingBag, color: 'blue' },
    { label: 'Listed', value: listedCount, icon: Tag, color: 'emerald' },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mt-8 max-w-xs">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="bg-white/[0.03] rounded-xl p-4 ring-1 ring-white/[0.06] hover:ring-white/[0.12] transition-all"
        >
          <div className="flex items-center gap-2 mb-1">
            <stat.icon className={`w-3.5 h-3.5 text-${stat.color}-400 opacity-60`} />
            <span className="text-[11px] text-gray-500 uppercase tracking-wider">{stat.label}</span>
          </div>
          <p className="text-2xl font-bold text-white tabular-nums">
            {isLoading ? '—' : stat.value}
          </p>
        </div>
      ))}
    </div>
  );
}
