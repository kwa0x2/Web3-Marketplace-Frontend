'use client';

import { useState } from 'react';
import { Collection, CollectionSelectorProps } from './types';
import { MOCK_COLLECTIONS } from '@/lib/mock_data';
import { CollectionThumbnail } from './collection-thumbnail';
import { DropdownItem } from './dropdown-item';
import { CreateCollectionModal } from './create-collection-modal';

export function CollectionSelector({ value, onChange }: CollectionSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const selectedCollection = MOCK_COLLECTIONS.find(c => c.id === value) || MOCK_COLLECTIONS[0];

  const handleSelect = (collectionId: string) => {
    if (collectionId === 'new') {
      setShowCreateModal(true);
      setIsOpen(false);
    } else {
      onChange(collectionId);
      setIsOpen(false);
    }
  };

  const handleCreateCollection = (data: { name: string; symbol: string; description: string }) => {
    const newCol: Collection = {
      id: Date.now().toString(),
      name: data.name,
      symbol: data.symbol,
      itemCount: 0
    };

    MOCK_COLLECTIONS.push(newCol);
    onChange(newCol.id);
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
            {MOCK_COLLECTIONS.map((collection) => (
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
