import { Collection } from './types';

export function CollectionThumbnail({ collection }: { collection: Collection }) {
  if (collection.id === 'new') {
    return (
      <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
        <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
      </div>
    );
  }

  return (
    <div className="w-10 h-10 rounded-lg bg-gray-700 flex items-center justify-center">
      <span className="text-xs font-bold text-white">{collection.symbol}</span>
    </div>
  );
}
