import { useRef, ChangeEvent } from 'react';
import Image from 'next/image';

interface UploadDropzoneProps {
  file: File | null;
  filePreview: string;
  onFileSelect: (file: File) => void;
  onClear: () => void;
}

const VALID_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'audio/mpeg'];
const MAX_SIZE = 100 * 1024 * 1024;

function validateFile(file: File): boolean {
  if (!VALID_TYPES.includes(file.type)) {
    alert('Please select a valid file type (JPEG, PNG, GIF, WebP, MP4, MP3)');
    return false;
  }
  if (file.size > MAX_SIZE) {
    alert('File size must be less than 100MB');
    return false;
  }
  return true;
}

export function UploadDropzone({ file, filePreview, onFileSelect, onClear }: UploadDropzoneProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && validateFile(selectedFile)) {
      onFileSelect(selectedFile);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile && validateFile(droppedFile)) {
      onFileSelect(droppedFile);
    }
  };

  return (
    <>
      <div
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-purple-500/30 rounded-xl p-8 hover:border-purple-500/60 transition-colors cursor-pointer bg-gray-800/30"
      >
        <input
          ref={fileInputRef}
          type="file"
          onChange={handleFileSelect}
          accept="image/*,video/mp4,audio/mpeg"
          className="hidden"
        />

        {filePreview ? (
          <div className="relative">
            <Image
              src={filePreview}
              alt="NFT Preview"
              width={400}
              height={400}
              className="mx-auto rounded-lg max-h-80 object-contain"
            />
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                onClear();
              }}
              className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-2 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        ) : (
          <div className="text-center">
            <div className="mb-4">
              <svg className="w-16 h-16 mx-auto text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-white mb-2">
              Drop your file here, or browse
            </h3>
            <p className="text-gray-400 text-sm mb-2">
              Supports: JPG, PNG, GIF, WebP, MP4, MP3
            </p>
            <p className="text-gray-500 text-xs">
              Max size: 100MB
            </p>
          </div>
        )}
      </div>

      {file && (
        <div className="bg-gray-800/50 rounded-lg p-3 border border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded bg-purple-500/20 flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <div>
                <p className="text-white text-sm font-medium">{file.name}</p>
                <p className="text-gray-400 text-xs">{(file.size / 1024 / 1024).toFixed(2)} MB</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
