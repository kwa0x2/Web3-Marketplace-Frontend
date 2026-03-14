export interface Activity {
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

export interface RecentActivityProps {
  activities: Activity[];
}
