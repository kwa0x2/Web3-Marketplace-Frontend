import Image from 'next/image';
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

  if (collection.image) {
    return (
      <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-[#1a1a1a]">
        <Image src={collection.image} alt={collection.name} fill className="object-cover" />
      </div>
    );
  }

  return (
    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-purple-500/20 to-blue-500/20 flex items-center justify-center">
      <span className="text-xs font-bold text-white">{collection.symbol}</span>
    </div>
  );
}
