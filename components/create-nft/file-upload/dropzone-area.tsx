import { Upload, Image as ImageIcon, Film, Music } from 'lucide-react';

interface DropzoneAreaProps {
  isDragActive: boolean;
  getRootProps: () => any;
  getInputProps: () => any;
}

export function DropzoneArea({ isDragActive, getRootProps, getInputProps }: DropzoneAreaProps) {
  return (
    <div
      {...getRootProps()}
      className={`relative border-2 border-dashed rounded-2xl p-12 transition-all duration-300 cursor-pointer ${
        isDragActive
          ? 'border-purple-500 bg-purple-500/10 scale-[1.02]'
          : 'border-gray-700 bg-gray-800/30 hover:border-purple-500/60 hover:bg-gray-800/50'
      }`}
    >
      <input {...getInputProps()} />

      <div className="text-center space-y-4">
        <div className={`mx-auto w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
          isDragActive
            ? 'bg-purple-500/20 text-purple-400 scale-110'
            : 'bg-gray-700/50 text-gray-400'
        }`}>
          <Upload className={`w-10 h-10 transition-transform duration-300 ${isDragActive ? 'animate-bounce' : ''}`} />
        </div>

        <div>
          <p className="text-white font-semibold text-lg mb-2">
            {isDragActive ? 'Drop your file here' : 'Drag and drop your file'}
          </p>
          <p className="text-gray-400 text-sm mb-4">
            or click to browse from your computer
          </p>
          <div className="inline-flex items-center space-x-2 text-xs text-gray-500">
            <ImageIcon className="w-4 h-4" />
            <Film className="w-4 h-4" />
            <Music className="w-4 h-4" />
            <span>PNG, JPG, GIF, WEBP, MP4, MP3 (Max 100MB)</span>
          </div>
        </div>

        <button
          type="button"
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50"
        >
          Choose File
        </button>
      </div>

      {isDragActive && (
        <div className="absolute inset-0 rounded-2xl border-2 border-purple-500 animate-pulse pointer-events-none" />
      )}
    </div>
  );
}
