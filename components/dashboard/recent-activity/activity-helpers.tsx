import {
  ShoppingBag,
  TrendingUp,
  Clock,
  ArrowUpRight,
  Tag
} from 'lucide-react';

export const getActivityIcon = (type: string) => {
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

export const getActivityColor = (type: string) => {
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

export const getActivityLabel = (type: string) => {
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
