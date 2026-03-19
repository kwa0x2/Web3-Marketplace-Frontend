import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';

// ========================================
// INTERFACES & TYPES
// ========================================

export interface NFTCollection {
  id: number;
  name: string;
  verified: boolean;
  image: string;
  floorPrice: number;
  floorChange24h: number | null;
  topOffer: number | null;
  sales24h: number;
  owners: number;
  listed: number;
  volume24h: number;
  volumeChange24h: number;
  isMock?: boolean;
  dbId?: string;
}

export interface Seller {
  id: number;
  name: string;
  sales: number;
  products: number;
  verified: boolean;
  type: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  type: string;
  duration: string;
}

export interface NFT {
  id: number;
  name: string;
  price: number;
  type: string;
}

export interface Category {
  icon: string;
  title: string;
  description: string;
}

export interface Feature {
  icon: string;
  title: string;
  description: string;
}

export interface Stat {
  icon: any;
  label: string;
  value: string;
  change: string;
  positive: boolean;
}

// ========================================
// NFT COLLECTIONS DATA
// ========================================

export const MOCK_NFT_COLLECTIONS: NFTCollection[] = [
  {
    id: 1,
    name: "Bored Ape Yacht Club",
    verified: true,
    image: "https://placehold.co/50x50/f59e0b/ffffff?text=BAYC&font=roboto",
    floorPrice: 14.69,
    floorChange24h: 3.8,
    topOffer: 14.21,
    sales24h: 47,
    owners: 6412,
    listed: 4.2,
    volume24h: 812.5,
    volumeChange24h: 22,
    isMock: true,
  },
  {
    id: 2,
    name: "CryptoPunks",
    verified: true,
    image: "https://placehold.co/50x50/6366f1/ffffff?text=PUNK&font=roboto",
    floorPrice: 42.95,
    floorChange24h: -1.7,
    topOffer: 41.5,
    sales24h: 12,
    owners: 3891,
    listed: 2.8,
    volume24h: 534.2,
    volumeChange24h: -5,
    isMock: true,
  },
  {
    id: 3,
    name: "Azuki",
    verified: true,
    image: "https://placehold.co/50x50/ec4899/ffffff?text=AZUKI&font=roboto",
    floorPrice: 5.12,
    floorChange24h: 12.4,
    topOffer: 4.98,
    sales24h: 89,
    owners: 5204,
    listed: 6.1,
    volume24h: 623.8,
    volumeChange24h: 35,
    isMock: true,
  },
  {
    id: 4,
    name: "Pudgy Penguins",
    verified: true,
    image: "https://placehold.co/50x50/8b5cf6/ffffff?text=PPG&font=roboto",
    floorPrice: 8.45,
    floorChange24h: -4.2,
    topOffer: 8.1,
    sales24h: 63,
    owners: 4718,
    listed: 5.5,
    volume24h: 447.9,
    volumeChange24h: -11,
    isMock: true,
  },
  {
    id: 5,
    name: "Doodles",
    verified: true,
    image: "https://placehold.co/50x50/14b8a6/ffffff?text=DOOD&font=roboto",
    floorPrice: 2.31,
    floorChange24h: 8.9,
    topOffer: 2.18,
    sales24h: 34,
    owners: 5893,
    listed: 3.7,
    volume24h: 198.4,
    volumeChange24h: 18,
    isMock: true,
  },
];

// ========================================
// SELLERS DATA
// ========================================

export const sellers: Seller[] = [
  { id: 1, name: "CryptoArtist", sales: 245, products: 18, verified: true, type: "NFT Artist" },
  { id: 2, name: "DevMaster", sales: 189, products: 12, verified: true, type: "Developer" },
  { id: 3, name: "API_Builder", sales: 156, products: 8, verified: true, type: "API Provider" },
];

// ========================================
// DIGITAL PRODUCTS DATA
// ========================================

export const products: Product[] = [
  {
    id: 1,
    name: "Premium AI API Access",
    description: "GPT-4 API with 1M tokens/month",
    price: 0.5,
    type: "API",
    duration: "Monthly"
  },
  {
    id: 2,
    name: "React UI Component Library",
    description: "100+ premium components",
    price: 0.15,
    type: "Software",
    duration: "Lifetime"
  },
  {
    id: 3,
    name: "Blockchain Analytics API",
    description: "Real-time blockchain data",
    price: 0.8,
    type: "API",
    duration: "Monthly"
  },
];

// ========================================
// NFT ITEMS DATA (for trending)
// ========================================

export const nfts: NFT[] = [
  { id: 1, name: "Cosmic Apes #142", price: 0.85, type: "NFT" },
  { id: 2, name: "Cyber Punk Avatar", price: 1.2, type: "NFT" },
  { id: 3, name: "Abstract Dreams", price: 0.58, type: "NFT" },
  { id: 4, name: "Meta Legend #891", price: 1.9, type: "NFT" },
];

// ========================================
// CATEGORIES DATA
// ========================================

export const categories: Category[] = [
  { icon: "🎨", title: "NFT Art", description: "Digital Collectibles" },
  { icon: "🔌", title: "API Access", description: "Premium APIs" },
  { icon: "💻", title: "Software", description: "Licenses & Tools" },
  { icon: "📦", title: "Templates", description: "Code & Design" },
];

// ========================================
// FEATURES DATA
// ========================================

export const features: Feature[] = [
  {
    icon: "💎",
    title: "Verified Collections",
    description: "Only authentic and verified NFT collections on our platform"
  },
  {
    icon: "🔒",
    title: "Secure Blockchain",
    description: "Built on Ethereum for maximum security and transparency"
  },
  {
    icon: "⚡",
    title: "Fast Transactions",
    description: "Quick and efficient trading with minimal gas fees"
  },
];

// ========================================
// LIVE STATS DATA
// ========================================

export const stats: Stat[] = [
  {
    icon: DollarSign,
    label: "Total Volume",
    value: "127,834 ETH",
    change: "+12.5%",
    positive: true,
  },
  {
    icon: ShoppingBag,
    label: "NFTs Sold",
    value: "45,892",
    change: "+8.3%",
    positive: true,
  },
  {
    icon: Users,
    label: "Active Users",
    value: "23,547",
    change: "+15.2%",
    positive: true,
  },
  {
    icon: TrendingUp,
    label: "Floor Price Avg",
    value: "2.4 ETH",
    change: "-2.1%",
    positive: false,
  },
];

// ========================================
// DASHBOARD DATA
// ========================================

export interface DashboardActivity {
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

export interface DashboardNFT {
  id: number;
  name: string;
  collection: string;
  image: string;
  price: string;
  priceChange: number;
}

export interface DashboardListing {
  id: number;
  nftName: string;
  collection: string;
  image: string;
  price: string;
  topOffer: string | null;
  listedDate: string;
}

export const MOCK_ACTIVITIES: DashboardActivity[] = [
  {
    id: 1,
    type: 'purchase',
    nftName: 'Cosmic Ape #1234',
    collection: 'Cosmic Apes',
    price: '2.5 ETH',
    from: '0x1234...5678',
    time: '2 hours ago',
    txHash: '0xabc...def',
  },
  {
    id: 2,
    type: 'sale',
    nftName: 'Digital Dreams #567',
    collection: 'Digital Dreams',
    price: '1.8 ETH',
    to: '0x8765...4321',
    time: '5 hours ago',
    txHash: '0x123...456',
  },
  {
    id: 3,
    type: 'listing',
    nftName: 'Pixel Warrior #89',
    collection: 'Pixel Warriors',
    price: '3.2 ETH',
    time: '1 day ago',
  },
  {
    id: 4,
    type: 'offer',
    nftName: 'Abstract Art #345',
    collection: 'Abstract Universe',
    price: '0.8 ETH',
    time: '2 days ago',
  },
];

export const MOCK_MY_NFTS: DashboardNFT[] = [
  {
    id: 1,
    name: 'Cosmic Ape #1234',
    collection: 'Cosmic Apes',
    image: 'https://placehold.co/300x300/6366f1/ffffff?text=NFT+1&font=roboto',
    price: '2.5 ETH',
    priceChange: 13.6,
  },
  {
    id: 2,
    name: 'Digital Dreams #567',
    collection: 'Digital Dreams',
    image: 'https://placehold.co/300x300/8b5cf6/ffffff?text=NFT+2&font=roboto',
    price: '1.8 ETH',
    priceChange: 20.0,
  },
  {
    id: 3,
    name: 'Pixel Warrior #89',
    collection: 'Pixel Warriors',
    image: 'https://placehold.co/300x300/ec4899/ffffff?text=NFT+3&font=roboto',
    price: '3.2 ETH',
    priceChange: 6.7,
  },
  {
    id: 4,
    name: 'Abstract Art #345',
    collection: 'Abstract Universe',
    image: 'https://placehold.co/300x300/14b8a6/ffffff?text=NFT+4&font=roboto',
    price: '0.8 ETH',
    priceChange: -11.1,
  },
];

export const MOCK_ACTIVE_LISTINGS: DashboardListing[] = [
  {
    id: 1,
    nftName: 'Pixel Warrior #89',
    collection: 'Pixel Warriors',
    image: 'https://placehold.co/80x80/ec4899/ffffff?text=PW&font=roboto',
    price: '3.2 ETH',
    topOffer: '2.8 ETH',
    listedDate: '1 day ago',
  },
  {
    id: 2,
    nftName: 'Space Explorer #432',
    collection: 'Space Explorers',
    image: 'https://placehold.co/80x80/f59e0b/ffffff?text=SE&font=roboto',
    price: '5.0 ETH',
    topOffer: null,
    listedDate: '3 days ago',
  },
];

// ========================================
// COLLECTION SELECTOR DATA
// ========================================

export interface MockCollection {
  id: string;
  name: string;
  symbol: string;
  image?: string;
  itemCount?: number;
}

export const MOCK_COLLECTIONS: MockCollection[] = [
  {
    id: 'new',
    name: 'Create New Collection',
    symbol: 'NEW',
    image: '',
    itemCount: 0
  },
  {
    id: '1',
    name: 'My Art Collection',
    symbol: 'MAC',
    image: '/api/placeholder/100/100',
    itemCount: 12
  },
  {
    id: '2',
    name: 'Digital Dreams',
    symbol: 'DD',
    image: '/api/placeholder/100/100',
    itemCount: 5
  }
];
