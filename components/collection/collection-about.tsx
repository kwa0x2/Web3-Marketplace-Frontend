import { CollectionDetail } from '@/hooks/useCollections';
import { CopyAddress } from './copy-address';

export function CollectionAbout({ collection }: { collection: CollectionDetail }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 bg-[#111] rounded-xl p-6 ring-1 ring-white/[0.06]">
        <h3 className="text-white font-semibold text-lg mb-4">Description</h3>
        {collection.description ? (
          <p className="text-gray-400 text-sm leading-relaxed whitespace-pre-wrap">
            {collection.description}
          </p>
        ) : (
          <p className="text-gray-600 text-sm italic">No description provided.</p>
        )}
      </div>

      <div className="lg:col-span-2 bg-[#111] rounded-xl p-6 ring-1 ring-white/[0.06] h-fit">
        <h3 className="text-white font-semibold text-lg mb-4">Details</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">Symbol</span>
            <span className="text-white text-sm font-mono">{collection.symbol}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">Owner</span>
            <CopyAddress address={collection.ownerAddress} />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">Items</span>
            <span className="text-white text-sm">{collection.stats.totalItems}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">Owners</span>
            <span className="text-white text-sm">{collection.stats.ownerCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-gray-500 text-sm">Listed</span>
            <span className="text-white text-sm">{collection.stats.listedCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
