import { X } from 'lucide-react';
import Image from 'next/image';
import { getFileIcon } from './file-icon';

interface FilePreviewProps {
  file: File;
  preview: string;
  onClear: () => void;
}

export function FilePreview({ file, preview, onClear }: FilePreviewProps) {
  return (
    <div className="space-y-4">
      <div className="relative group">
        <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-6 border-2 border-purple-500/30">
          {preview ? (
            <div className="relative aspect-square rounded-xl overflow-hidden bg-gray-950">
              <Image
                src={preview}
                alt="NFT Preview"
                fill
                className="object-contain"
              />
            </div>
          ) : (
            <div className="aspect-square rounded-xl bg-gray-950 flex items-center justify-center text-purple-400">
              {getFileIcon(file.type)}
              <div className="ml-3">
                <p className="font-semibold text-white">{file.type.split('/')[0].toUpperCase()}</p>
                <p className="text-sm text-gray-400">File uploaded</p>
              </div>
            </div>
          )}

          <button
            type="button"
            onClick={onClear}
            className="absolute top-8 right-8 p-2 bg-red-500/90 hover:bg-red-600 text-white rounded-full transition-all duration-200 opacity-0 group-hover:opacity-100 shadow-lg"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-3 px-4 py-3 bg-gray-800/50 rounded-xl border border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-400">
              {getFileIcon(file.type)}
            </div>
            <div>
              <p className="text-white text-sm font-medium truncate max-w-[200px]">{file.name}</p>
              <p className="text-gray-400 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClear}
            className="text-red-400 hover:text-red-300 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
