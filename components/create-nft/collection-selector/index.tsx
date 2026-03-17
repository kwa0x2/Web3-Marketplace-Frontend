'use client';

import { useState } from 'react';
import axios from 'axios';
import { Collection, CollectionSelectorProps } from './types';
import { useMyCollections } from '@/hooks/useCollections';
import { CollectionThumbnail } from './collection-thumbnail';
import { DropdownItem } from './dropdown-item';
import { CreateCollectionModal } from './create-collection-modal';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1';

const NEW_COLLECTION: Collection = { id: 'new', name: 'Create New Collection', symbol: 'NEW', image: '', itemCount: 0 };

export function CollectionSelector({ value, onChange }: CollectionSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const { collections: myCollections, refetch } = useMyCollections();

  const allCollections: Collection[] = [
    NEW_COLLECTION,
    ...myCollections.map((c) => ({
      id: c.id,
      name: c.name,
      symbol: c.symbol,
      image: c.image || undefined,
      itemCount: c.itemCount,
    })),
  ];

  const selectedCollection = allCollections.find(c => c.id === value) || NEW_COLLECTION;

  const handleSelect = (collectionId: string) => {
    if (collectionId === 'new') {
      setShowCreateModal(true);
      setIsOpen(false);
    } else {
      onChange(collectionId);
      setIsOpen(false);
    }
  };

  const handleCreateCollection = async (data: { name: string; symbol: string; description: string }) => {
    try {
      const res = await axios.post(`${API_URL}/collection`, data, { withCredentials: true });
      const created = res.data.data;
      onChange(created.id);
      refetch();
    } catch (err) {
      console.error('Failed to create collection:', err);
    }
    setShowCreateModal(false);
  };

  return (
    <>
      <div className="relative">
        <label className="block text-white font-semibold mb-3">Collection</label>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="w-full px-4 py-3 rounded-lg bg-gray-900/60 border border-gray-600 text-white focus:outline-none focus:border-purple-500 focus:bg-gray-900/80 transition-all flex items-center justify-between"
        >
          <div className="flex items-center space-x-3">
            <CollectionThumbnail collection={selectedCollection} />
            <div className="text-left">
              <p className="font-semibold">{selectedCollection.name}</p>
              {selectedCollection.id !== 'new' && (
                <p className="text-gray-400 text-xs">{selectedCollection.itemCount} items</p>
              )}
            </div>
          </div>
          <svg className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {isOpen && (
          <div className="absolute z-10 mt-2 w-full bg-gray-800 border border-gray-600 rounded-lg overflow-hidden">
            {allCollections.map((collection) => (
              <DropdownItem
                key={collection.id}
                collection={collection}
                isSelected={collection.id === value}
                onSelect={handleSelect}
              />
            ))}
          </div>
        )}
      </div>

      {showCreateModal && (
        <CreateCollectionModal
          onClose={() => setShowCreateModal(false)}
          onCreate={handleCreateCollection}
        />
      )}
    </>
  );
}
