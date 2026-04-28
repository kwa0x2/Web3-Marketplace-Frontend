'use client';

import { useState, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAccount } from 'wagmi';
import { useProfileNFTs } from '@/hooks/useProfileNFTs';
import { Navigation } from '@/components/home';
import { ListForSaleModal } from '@/components/nft/list-for-sale-modal';
import { NFTCardData } from '@/components/nft/nft-card';
import {
  ProfileBanner,
  ProfileNotConnected,
  ProfileHeader,
  ProfileStats,
  ProfileTabs,
  ProfileTab,
  ProfileNFTGrid,
} from '@/components/profile';

export default function ProfilePage() {
  const { isConnected, isAuthenticated, authenticate, isLoading: authLoading, error: authError, address } = useAuth();
  const { chain } = useAccount();

  const [activeTab, setActiveTab] = useState<ProfileTab>('owned');
  const [copied, setCopied] = useState(false);
  const [listModalNFT, setListModalNFT] = useState<NFTCardData | null>(null);

  const { nfts: ownedNFTs, isLoading, error, refetch } = useProfileNFTs();

  const listedNFTs = useMemo(
    () => ownedNFTs.filter((n) => n.price != null && n.price > 0),
    [ownedNFTs]
  );

  const currentNFTs = activeTab === 'owned' ? ownedNFTs : listedNFTs;

  const handleTabChange = (tab: ProfileTab) => setActiveTab(tab);

  const handleCopyAddress = () => {
    if (!address) return;
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const shortAddress = address ? `${address.slice(0, 6)}...${address.slice(-4)}` : '';
  const explorerBase = chain?.id === 11155111 ? 'https://sepolia.etherscan.io' : 'https://etherscan.io';

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black">
        <Navigation />
        <ProfileNotConnected />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <ProfileBanner />

      <div className="max-w-[1800px] mx-auto px-6 md:px-8 -mt-16 relative z-10">
        <ProfileHeader
          address={address!}
          shortAddress={shortAddress}
          isAuthenticated={isAuthenticated}
          isAuthLoading={authLoading}
          authError={authError}
          copied={copied}
          chainName={chain?.name}
          explorerBase={explorerBase}
          onCopy={handleCopyAddress}
          onAuthenticate={authenticate}
        />

        <ProfileStats
          ownedCount={ownedNFTs.length}
          listedCount={listedNFTs.length}
          isLoading={isLoading}
        />

        <ProfileTabs
          activeTab={activeTab}
          ownedCount={ownedNFTs.length}
          listedCount={listedNFTs.length}
          onChange={handleTabChange}
        />

        <ProfileNFTGrid
          nfts={currentNFTs}
          activeTab={activeTab}
          isLoading={isLoading}
          error={error}
          isAuthenticated={isAuthenticated}
          onListNFT={setListModalNFT}
          onTabChange={handleTabChange}
        />
      </div>

      {listModalNFT && (
        <ListForSaleModal
          nft={listModalNFT}
          onClose={() => setListModalNFT(null)}
          onSuccess={refetch}
        />
      )}
    </div>
  );
}
