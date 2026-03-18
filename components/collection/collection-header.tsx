import Image from 'next/image';
import { BadgeCheck, ImageIcon } from 'lucide-react';
import { CollectionDetail } from '@/hooks/useCollections';
import { CopyAddress } from './copy-address';

export function CollectionHeader({ collection }: { collection: CollectionDetail }) {
  return (
    <>
      <div className="relative h-44 rounded-2xl overflow-hidden mb-0 bg-gradient-to-br from-purple-600/30 via-indigo-600/20 to-blue-600/30">
        {collection.banner ? (
          <Image src={collection.banner} alt="Banner" fill className="object-cover" />
        ) : (
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djItSDJ2LTJoMzR6TTAgMGg0djRIMFYwem0wIDZ2LTJoMnYySDAgem0wIDZ2LTJoMnYySDB6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
        )}
      </div>

      <div className="relative px-6 -mt-14 mb-6">
        <div className="flex flex-col sm:flex-row items-start gap-5">
          <div className="relative w-28 h-28 rounded-2xl overflow-hidden bg-[#18181b] ring-4 ring-black flex-shrink-0 shadow-2xl">
            {collection.image ? (
              <Image
                src={collection.image}
                alt={collection.name}
                fill
                className="object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-500/20 to-blue-500/20">
                <ImageIcon className="w-10 h-10 text-gray-600" />
              </div>
            )}
          </div>

          <div className="min-w-0 pt-4 sm:pt-8">
            <div className="flex items-center gap-2.5">
              <h1 className="text-3xl font-bold text-white truncate">{collection.name}</h1>
              {collection.verified && (
                <BadgeCheck className="w-6 h-6 text-blue-500 flex-shrink-0" />
              )}
              <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-purple-500/15 text-purple-400 rounded-full border border-purple-500/20">
                {collection.symbol}
              </span>
            </div>

            <div className="flex items-center gap-3 mt-2">
              <span className="text-gray-500 text-sm">by</span>
              <CopyAddress address={collection.ownerAddress} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
