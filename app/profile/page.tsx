'use client';

import { useState, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useAccount } from 'wagmi';
import { useProfileNFTs } from '@/hooks/useProfileNFTs';
import { useMyCollections } from '@/hooks/useCollections';
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
  ProfileCollectionGrid,
  EditProfileModal,
} from '@/components/profile';

export default function ProfilePage() {
  const { isConnected, isAuthenticated, authenticate, isLoading: authLoading, error: authError, address, user, updateProfile } = useAuth();
  const { chain } = useAccount();

  const [activeTab, setActiveTab] = useState<ProfileTab>('owned');
  const [copied, setCopied] = useState(false);
  const [listModalNFT, setListModalNFT] = useState<NFTCardData | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const { nfts: ownedNFTs, isLoading: nftsLoading, error: nftsError, refetch: refetchNFTs } = useProfileNFTs();
  const { collections, isLoading: collectionsLoading, error: collectionsError } = useMyCollections();

  const listedNFTs = useMemo(
    () => ownedNFTs.filter((n) => n.price != null && n.price > 0),
    [ownedNFTs]
  );

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
      <ProfileBanner bannerUrl={user?.banner} />

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
          avatarUrl={user?.avatar}
          onCopy={handleCopyAddress}
          onAuthenticate={authenticate}
          onEditProfile={() => setShowEditModal(true)}
        />

        <ProfileStats
          ownedCount={ownedNFTs.length}
          listedCount={listedNFTs.length}
          collectionsCount={collections.length}
          isLoading={nftsLoading}
        />

        <ProfileTabs
          activeTab={activeTab}
          ownedCount={ownedNFTs.length}
          listedCount={listedNFTs.length}
          collectionsCount={collections.length}
          onChange={handleTabChange}
        />

        {activeTab === 'collections' ? (
          <ProfileCollectionGrid
            collections={collections}
            isLoading={collectionsLoading}
            error={collectionsError}
          />
        ) : (
          <ProfileNFTGrid
            nfts={activeTab === 'owned' ? ownedNFTs : listedNFTs}
            activeTab={activeTab}
            isLoading={nftsLoading}
            error={nftsError}
            isAuthenticated={isAuthenticated}
            onListNFT={setListModalNFT}
            onTabChange={handleTabChange}
          />
        )}
      </div>

      {listModalNFT && (
        <ListForSaleModal
          nft={listModalNFT}
          onClose={() => setListModalNFT(null)}
          onSuccess={refetchNFTs}
        />
      )}

      {showEditModal && user && (
        <EditProfileModal
          user={user}
          onClose={() => setShowEditModal(false)}
          onSave={updateProfile}
        />
      )}
    </div>
  );
}
