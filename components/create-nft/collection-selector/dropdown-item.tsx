import { Collection } from './types';
import { CollectionThumbnail } from './collection-thumbnail';

export function DropdownItem({ collection, isSelected, onSelect }: {
  collection: Collection;
  isSelected: boolean;
  onSelect: (id: string) => void;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(collection.id)}
      className="w-full px-4 py-3 hover:bg-gray-700 transition-colors flex items-center space-x-3"
    >
      <CollectionThumbnail collection={collection} />
      <div className="text-left flex-1">
        <p className="text-white font-semibold">{collection.name}</p>
        {collection.id !== 'new' && (
          <p className="text-gray-400 text-xs">{collection.itemCount} items</p>
        )}
      </div>
      {isSelected && (
        <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      )}
    </button>
  );
}
