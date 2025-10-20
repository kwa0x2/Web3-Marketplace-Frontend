import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  ShoppingBag,
  TrendingUp,
  Clock,
  ArrowUpRight,
  ExternalLink,
  Tag
} from 'lucide-react';

interface Activity {
  id: number;
  type: string;
  nftName: string;
  collection: string;
  price: string;
  from?: string;
  to?: string;
  time: string;
  txHash?: string;
}

interface RecentActivityProps {
  activities: Activity[];
}

const getActivityIcon = (type: string) => {
  switch (type) {
    case 'purchase':
      return <ShoppingBag className="w-4 h-4" />;
    case 'sale':
      return <TrendingUp className="w-4 h-4" />;
    case 'listing':
      return <Tag className="w-4 h-4" />;
    case 'offer':
      return <ArrowUpRight className="w-4 h-4" />;
    default:
      return <Clock className="w-4 h-4" />;
  }
};

const getActivityColor = (type: string) => {
  switch (type) {
    case 'purchase':
      return 'bg-blue-500/20 text-blue-400';
    case 'sale':
      return 'bg-green-500/20 text-green-400';
    case 'listing':
      return 'bg-purple-500/20 text-purple-400';
    case 'offer':
      return 'bg-orange-500/20 text-orange-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
};

const getActivityLabel = (type: string) => {
  switch (type) {
    case 'purchase':
      return 'Purchased';
    case 'sale':
      return 'Sold';
    case 'listing':
      return 'Listed';
    case 'offer':
      return 'Offer Made';
    default:
      return type;
  }
};

export default function RecentActivity({ activities }: RecentActivityProps) {
  return (
    <Card className="bg-black/40 border-white/10">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-white">Recent Activity</CardTitle>
            <CardDescription>Your latest transactions</CardDescription>
          </div>
          <Clock className="w-5 h-5 text-gray-400" />
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className="flex items-start gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
            >
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
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
