import { Badge } from '@/components/ui/badge';
import { ExternalLink } from 'lucide-react';
import { Activity } from './types';
import { getActivityIcon, getActivityColor, getActivityLabel } from './activity-helpers';

interface ActivityItemProps {
  activity: Activity;
}

export function ActivityItem({ activity }: ActivityItemProps) {
  return (
    <div className="flex items-start gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
      <div className={`p-2 rounded-lg ${getActivityColor(activity.type)}`}>
        {getActivityIcon(activity.type)}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between mb-1">
          <p className="text-white font-medium truncate">{activity.nftName}</p>
          <p className="text-white font-bold text-sm">{activity.price}</p>
        </div>
        <p className="text-xs text-gray-400 mb-1">{activity.collection}</p>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {getActivityLabel(activity.type)}
          </Badge>
          <span className="text-xs text-gray-500">{activity.time}</span>
          {activity.txHash && (
            <a
              href={`https://etherscan.io/tx/${activity.txHash}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300"
            >
              <ExternalLink className="w-3 h-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
