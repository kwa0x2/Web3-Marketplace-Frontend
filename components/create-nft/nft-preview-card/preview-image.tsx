import Image from 'next/image';
import { Heart } from 'lucide-react';

interface PreviewImageProps {
  imagePreview?: string;
  displayName: string;
  category?: string;
}

export function PreviewImage({ imagePreview, displayName, category }: PreviewImageProps) {
  return (
    <div className="relative aspect-square bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center overflow-hidden group">
      {imagePreview ? (
        <>
          <Image
            src={imagePreview}
            alt={displayName}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </>
      ) : (
        <div className="text-center p-8">
          <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center">
            <svg className="w-12 h-12 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
          <p className="text-gray-500 text-sm">
            Upload a file to see<br />your NFT preview
          </p>
          <div className="mt-4 inline-flex items-center space-x-2 text-xs text-gray-600">
            <span className="w-2 h-2 rounded-full bg-purple-500/50 animate-pulse" />
            <span>Awaiting upload...</span>
          </div>
        </div>
      )}

      {category && imagePreview && (
        <div className="absolute top-4 left-4 px-3 py-1 bg-black/60 backdrop-blur-sm rounded-full text-xs font-semibold text-white border border-white/20">
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </div>
      )}

      {imagePreview && (
        <button className="absolute top-4 right-4 p-2 bg-black/60 backdrop-blur-sm hover:bg-black/80 rounded-full transition-all group/like">
          <Heart className="w-5 h-5 text-white group-hover/like:fill-red-500 group-hover/like:text-red-500 transition-all" />
        </button>
      )}
    </div>
  );
}
