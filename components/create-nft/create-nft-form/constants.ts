import { mainnet, sepolia, polygon, arbitrum, optimism, base } from 'wagmi/chains';

export const chains = [
  { id: mainnet.id, name: 'Ethereum', icon: '⟠' },
  { id: sepolia.id, name: 'Sepolia', icon: '⟠' },
  { id: polygon.id, name: 'Polygon', icon: '⬡' },
  { id: arbitrum.id, name: 'Arbitrum', icon: '◆' },
  { id: optimism.id, name: 'Optimism', icon: '🔴' },
  { id: base.id, name: 'Base', icon: '🔵' },
];

export const currencies = ['ETH', 'WETH', 'USDC', 'USDT', 'DAI'];
