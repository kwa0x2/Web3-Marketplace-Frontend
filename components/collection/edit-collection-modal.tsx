'use client';

import { useRef, useState, useCallback } from 'react';
import { X, Camera, ImageIcon, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { CollectionDetail } from '@/hooks/useCollections';
import apiClient from '@/api/axios';

interface EditCollectionModalProps {
  collection: CollectionDetail;
  onClose: () => void;
  onSave: () => void;
}

export function EditCollectionModal({ collection, onClose, onSave }: EditCollectionModalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState(collection.name);
  const [description, setDescription] = useState(collection.description ?? '');
  const [imagePreview, setImagePreview] = useState<string | null>(collection.image ?? null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(collection.banner ?? null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const imageInputRef = useRef<HTMLInputElement>(null);
  const bannerInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      setPreview: (v: string | null) => void,
      setFile: (f: File | null) => void
    ) => {
      const file = e.target.files?.[0];
      if (!file) return;
      setFile(file);
      setPreview(URL.createObjectURL(file));
    },
    []
  );

  const handleSubmit = async () => {
    setIsSaving(true);
    setError(null);
    try {
      const nameChanged = name.trim() !== collection.name;
      const descChanged = description !== (collection.description ?? '');
      if (nameChanged || descChanged) {
        await apiClient.patch(`/collection/${collection.id}/description`, {
          name: name.trim(),
          description: description || null,
        });
      }

      if (imageFile || bannerFile) {
        const fd = new FormData();
        if (imageFile) fd.append('image', imageFile);
        if (bannerFile) fd.append('banner', bannerFile);
        await apiClient.put(`/collection/${collection.id}/images`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }

      onSave();
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.error ?? err?.message ?? 'Failed to save');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-white font-semibold text-lg">Edit Collection</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Banner */}
        <div
          className="relative h-36 cursor-pointer group"
          onClick={() => bannerInputRef.current?.click()}
        >
          {bannerPreview ? (
            <img src={bannerPreview} alt="Banner" className="w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-purple-600/30 via-indigo-600/20 to-blue-600/30" />
          )}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Camera className="w-5 h-5 text-white" />
            <span className="text-white text-sm font-medium">Change Banner</span>
          </div>
          <input
            ref={bannerInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageChange(e, setBannerPreview, setBannerFile)}
          />
        </div>

        {/* Collection Image */}
        <div className="px-6 -mt-10 mb-2 relative z-10">
          <div
            className="relative w-20 h-20 cursor-pointer group mt-12"
            onClick={() => imageInputRef.current?.click()}
          >
            <div className="w-20 h-20 rounded-2xl bg-[#18181b] ring-4 ring-black overflow-hidden flex items-center justify-center">
              {imagePreview ? (
                <img src={imagePreview} alt="Collection" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-8 h-8 text-gray-600" />
              )}
            </div>
            <div className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
          </div>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageChange(e, setImagePreview, setImageFile)}
          />
        </div>

        {/* Name & Description */}
        <div className="px-6 pb-2 space-y-3">
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Collection Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              maxLength={100}
              className="w-full px-3 py-2.5 bg-white/[0.04] ring-1 ring-white/[0.08] rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-purple-500/50 transition-all"
            />
          </div>
          <div>
            <label className="text-xs text-gray-500 uppercase tracking-wider mb-1.5 block">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={3}
              maxLength={1000}
              placeholder="Describe your collection..."
              className="w-full px-3 py-2.5 bg-white/[0.04] ring-1 ring-white/[0.08] rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none focus:ring-purple-500/50 transition-all resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 pb-6 space-y-4">
          {error && (
            <p className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 rounded-xl px-3 py-2">
              {error}
            </p>
          )}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1 border-white/10 text-gray-400 hover:text-white"
              onClick={onClose}
              disabled={isSaving}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500"
              onClick={handleSubmit}
              disabled={isSaving || !name.trim()}
            >
              {isSaving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
