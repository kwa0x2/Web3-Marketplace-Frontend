import { mainnet, sepolia, polygon, arbitrum, optimism, base } from 'wagmi/chains';


export const supportedChains = [
  {
    id: mainnet.id.toString(),
    name: 'Ethereum',
    description: 'Most popular NFT blockchain',
    icon: '⟠',
    color: 'from-blue-600 to-cyan-600',
  },
  {
    id: sepolia.id.toString(),
    name: 'Sepolia',
    description: 'Ethereum Testnet for development',
    icon: '⟠',
    color: 'from-purple-600 to-pink-600',
  },
  {
    id: polygon.id.toString(),
    name: 'Polygon',
    description: 'Fast and efficient network',
    icon: '⬡',
    color: 'from-purple-500 to-violet-600',
  },
  {
    id: arbitrum.id.toString(),
    name: 'Arbitrum',
    description: 'Layer 2 scaling solution',
    icon: '◆',
    color: 'from-blue-500 to-indigo-600',
  },
  {
    id: optimism.id.toString(),
    name: 'Optimism',
    description: 'Optimistic rollup network',
    icon: '🔴',
    color: 'from-red-500 to-pink-600',
  },
  {
    id: base.id.toString(),
    name: 'Base',
    description: 'Coinbase L2 network',
    icon: '🔵',
    color: 'from-blue-600 to-cyan-500',
  },
];