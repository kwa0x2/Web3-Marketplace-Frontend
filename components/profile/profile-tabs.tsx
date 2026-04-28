import { ShoppingBag, Tag } from 'lucide-react';

export type ProfileTab = 'owned' | 'listed';

interface ProfileTabsProps {
  activeTab: ProfileTab;
  ownedCount: number;
  listedCount: number;
  onChange: (tab: ProfileTab) => void;
}

export function ProfileTabs({ activeTab, ownedCount, listedCount, onChange }: ProfileTabsProps) {
  const tabs = [
    { key: 'owned' as ProfileTab, label: 'Owned', icon: ShoppingBag, count: ownedCount },
    { key: 'listed' as ProfileTab, label: 'Listed', icon: Tag, count: listedCount },
  ];

  return (
    <div className="flex items-center gap-1 mt-8 border-b border-white/[0.06]">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex items-center gap-2 px-5 py-3.5 text-sm font-medium border-b-2 transition-all ${
            activeTab === tab.key
              ? 'text-white border-purple-500'
              : 'text-gray-500 border-transparent hover:text-gray-300 hover:border-gray-700'
          }`}
        >
          <tab.icon className="w-4 h-4" />
          {tab.label}
          <span className={`text-xs px-1.5 py-0.5 rounded-md ${
            activeTab === tab.key
              ? 'bg-purple-500/20 text-purple-300'
              : 'bg-white/[0.05] text-gray-600'
          }`}>
            {tab.count}
          </span>
        </button>
      ))}
    </div>
  );
}
