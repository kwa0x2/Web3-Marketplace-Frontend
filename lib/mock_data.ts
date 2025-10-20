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
    name: "Cosmic Apes Collection",
    verified: true,
    image: "https://placehold.co/50x50/6366f1/ffffff?text=CA&font=roboto",
    floorPrice: 45,
    floorChange24h: 20.2,
    topOffer: 11.25,
    sales24h: 280,
    owners: 199912,
    listed: 0.1,
    volume24h: 9111,
    volumeChange24h: 15,
  },
  {
    id: 2,
    name: "Legend Of Blockchain",
    verified: true,
    image: "https://placehold.co/50x50/8b5cf6/ffffff?text=LOB&font=roboto",
    floorPrice: 675,
    floorChange24h: null,
    topOffer: 580,
    sales24h: 1,
    owners: 2591,
    listed: 0.3,
    volume24h: 524.8,
    volumeChange24h: 5,
  },
  {
    id: 3,
    name: "Digital Dreams NFT",
    verified: false,
    image: "https://placehold.co/50x50/ec4899/ffffff?text=DD&font=roboto",
    floorPrice: 295,
    floorChange24h: null,
    topOffer: 25,
    sales24h: 1,
    owners: 173,
    listed: 12.5,
    volume24h: 222,
    volumeChange24h: -8,
  },
  {
    id: 4,
    name: "Pixel Warriors Pass",
    verified: true,
    image: "https://placehold.co/50x50/f59e0b/ffffff?text=PW&font=roboto",
    floorPrice: 400,
    floorChange24h: 99,
    topOffer: null,
    sales24h: 1,
    owners: 289,
    listed: 2.1,
    volume24h: 201,
    volumeChange24h: 85,
  },
  {
    id: 5,
    name: "Abstract Universe",
    verified: true,
    image: "https://placehold.co/50x50/14b8a6/ffffff?text=AU&font=roboto",
    floorPrice: 45,
    floorChange24h: null,
    topOffer: null,
    sales24h: 4,
    owners: 351,
    listed: 7.7,
    volume24h: 174.7,
    volumeChange24h: 2,
  },
  {
    id: 6,
    name: "Mega Rebel Collection",
    verified: true,
    image: "https://placehold.co/50x50/ef4444/ffffff?text=MR&font=roboto",
    floorPrice: 145,
    floorChange24h: -3.3,
    topOffer: null,
    sales24h: 1,
    owners: 589,
    listed: 2.7,
    volume24h: 113,
    volumeChange24h: -12,
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
