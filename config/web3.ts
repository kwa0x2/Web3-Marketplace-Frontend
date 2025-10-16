import { cookieStorage, createStorage } from 'wagmi';
import { WagmiAdapter } from '@reown/appkit-adapter-wagmi';
import { mainnet, sepolia, polygon, arbitrum, optimism, base } from 'wagmi/chains';

if (!process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID) {
  throw new Error('NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID is not set in the environment variables');
}

export const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID;



export const metadata = {
  name: 'Web3 Marketplace',
  description: 'Web3 Marketplace - NFT & Digital Products Platform',
  url: typeof window !== 'undefined' ? window.location.origin : 'https://web3marketplace.com',
  icons: ['https://avatars.githubusercontent.com/u/37784886']
};

export const chains = [mainnet, sepolia, polygon, arbitrum, optimism, base] as const;

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage
  }),
  ssr: true,
  projectId,
  networks: chains as any,
});

export const config = wagmiAdapter.wagmiConfig;
