'use client';

import { useState, useRef, useCallback } from 'react';
import { X, ImageIcon, Sparkles, Upload, Trash2, Camera } from 'lucide-react';

export interface CreateCollectionData {
  name: string;
  symbol: string;
  description: string;
  imageFile: File | null;
  bannerFile: File | null;
}

interface CreateCollectionModalProps {
  onClose: () => void;
  onCreate: (data: CreateCollectionData) => void;
}

export function CreateCollectionModal({ onClose, onCreate }: CreateCollectionModalProps) {
  const [name, setName] = useState('');
  const [symbol, setSymbol] = useState('');
  const [description, setDescription] = useState('');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const canSubmit = name.trim().length >= 2 && symbol.trim().length >= 2;

  const handleFile = useCallback((file: File, type: 'image' | 'banner') => {
    if (!file.type.startsWith('image/')) return;
    const url = URL.createObjectURL(file);
    if (type === 'image') {
      setImageFile(file);
      setImagePreview(url);
    } else {
      setBannerFile(file);
      setBannerPreview(url);
    }
  }, []);

  const clearFile = (type: 'image' | 'banner') => {
    if (type === 'image') {
      if (imagePreview) URL.revokeObjectURL(imagePreview);
      setImageFile(null);
      setImagePreview(null);
    } else {
      if (bannerPreview) URL.revokeObjectURL(bannerPreview);
      setBannerFile(null);
      setBannerPreview(null);
    }
  };

  const handleDrop = (e: React.DragEvent, type: 'image' | 'banner') => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file, type);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative bg-[#0e0e0e] rounded-2xl w-full max-w-lg ring-1 ring-white/[0.08] shadow-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative">
          <div
            onDrop={(e) => handleDrop(e, 'banner')}
            onDragOver={(e) => e.preventDefault()}
            onClick={() => bannerInputRef.current?.click()}
            className="relative h-32 cursor-pointer group overflow-hidden"
          >
            {bannerPreview ? (
              <>
                <img src={bannerPreview} alt="Banner" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <Camera className="w-4 h-4 text-white" />
                  <span className="text-white text-xs font-medium">Change banner</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => { e.stopPropagation(); clearFile('banner'); }}
                  className="absolute top-2 right-2 w-7 h-7 rounded-lg bg-black/60 hover:bg-red-500/80 flex items-center justify-center transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 className="w-3.5 h-3.5 text-white" />
                </button>
              </>
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-purple-600/20 via-indigo-600/15 to-blue-600/20 flex items-center justify-center gap-2">
                <Upload className="w-4 h-4 text-gray-600 group-hover:text-gray-400 transition-colors" />
                <span className="text-gray-600 text-xs group-hover:text-gray-400 transition-colors">Upload banner</span>
              </div>
            )}
            <input
              ref={bannerInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f, 'banner'); }}
            />
          </div>

          <div className="absolute -bottom-10 left-6">
            <div
              onDrop={(e) => handleDrop(e, 'image')}
              onDragOver={(e) => e.preventDefault()}
              onClick={() => imageInputRef.current?.click()}
              className="relative w-20 h-20 rounded-2xl overflow-hidden bg-[#1a1a1a] ring-4 ring-[#0e0e0e] cursor-pointer group shadow-xl"
            >
              {imagePreview ? (
                <>
                  <img src={imagePreview} alt="Collection" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Camera className="w-4 h-4 text-white" />
                  </div>
                  <button
                    type="button"
                    onClick={(e) => { e.stopPropagation(); clearFile('image'); }}
                    className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-red-500/90 hover:bg-red-500 flex items-center justify-center transition-colors"
                  >
                    <X className="w-3 h-3 text-white" />
                  </button>
                </>
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center gap-0.5 bg-gradient-to-br from-purple-500/10 to-blue-500/10">
                  <ImageIcon className="w-5 h-5 text-gray-600 group-hover:text-gray-400 transition-colors" />
                  <span className="text-gray-600 text-[9px] group-hover:text-gray-400 transition-colors">Logo</span>
                </div>
              )}
              <input
                ref={imageInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFile(f, 'image'); }}
              />
            </div>
          </div>

          <button
            onClick={onClose}
            className="absolute top-2 right-2 w-8 h-8 rounded-lg bg-black/40 hover:bg-black/60 flex items-center justify-center transition-colors backdrop-blur-sm"
          >
            <X className="w-4 h-4 text-white/80" />
          </button>
        </div>

        <div className="px-6 pt-14 pb-6">
          <div className="flex items-center gap-2 mb-6">
            <Sparkles className="w-4 h-4 text-purple-400" />
            <h3 className="text-lg font-bold text-white">New Collection</h3>
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 text-xs font-medium mb-1.5">Collection Name *</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="My Awesome NFTs"
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] ring-1 ring-white/[0.08] text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-purple-500/40 transition-all"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-400 text-xs font-medium mb-1.5">Symbol *</label>
            <input
              type="text"
              value={symbol}
              onChange={(e) => setSymbol(e.target.value.toUpperCase())}
              placeholder="MAN"
              maxLength={5}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] ring-1 ring-white/[0.08] text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-purple-500/40 transition-all font-mono tracking-wider"
            />
            <p className="text-gray-600 text-[11px] mt-1">Max 5 characters. Used as short identifier.</p>
          </div>

          <div className="mb-6">
            <label className="block text-gray-400 text-xs font-medium mb-1.5">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Tell people about your collection..."
              rows={3}
              className="w-full px-3.5 py-2.5 rounded-xl bg-white/[0.04] ring-1 ring-white/[0.08] text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-purple-500/40 transition-all resize-none"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl ring-1 ring-white/[0.08] text-gray-400 text-sm font-medium hover:bg-white/5 hover:text-white transition-all"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => onCreate({ name, symbol, description, imageFile, bannerFile })}
              disabled={!canSubmit}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium hover:from-purple-500 hover:to-indigo-500 transition-all disabled:opacity-30 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20 disabled:shadow-none"
            >
              Create Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
