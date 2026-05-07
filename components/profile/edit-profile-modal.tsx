'use client';

import { useRef, useState, useCallback } from 'react';
import { X, Camera, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { User } from '@/types';

interface EditProfileModalProps {
  user: User;
  onClose: () => void;
  onSave: (formData: FormData) => Promise<void>;
}

export function EditProfileModal({ user, onClose, onSave }: EditProfileModalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [avatarPreview, setAvatarPreview] = useState<string | null>(user.avatar ?? null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(user.banner ?? null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [bannerFile, setBannerFile] = useState<File | null>(null);

  const avatarInputRef = useRef<HTMLInputElement>(null);
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
    if (!avatarFile && !bannerFile) {
      onClose();
      return;
    }
    setIsSaving(true);
    setError(null);
    try {
      const fd = new FormData();
      if (avatarFile) fd.append('avatar', avatarFile);
      if (bannerFile) fd.append('banner', bannerFile);
      await onSave(fd);
      onClose();
    } catch (err: any) {
      setError(err?.response?.data?.error ?? err?.message ?? 'Failed to save profile');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="relative w-full max-w-lg bg-[#111] border border-white/10 rounded-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10">
          <h2 className="text-white font-semibold text-lg">Edit Profile</h2>
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
            <div className="absolute inset-0 bg-gradient-to-br from-purple-900/80 via-blue-900/60 to-black" />
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

        {/* Avatar */}
        <div className="px-6 -mt-10 mb-6 relative z-10">
          <p className="text-xs text-gray-500 mb-2 mt-12">Profile Photo</p>
          <div
            className="relative w-20 h-20 cursor-pointer group"
            onClick={() => avatarInputRef.current?.click()}
          >
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-500 p-[3px] shadow-xl shadow-purple-500/20">
              <div className="w-full h-full rounded-[13px] bg-[#0a0a0a] overflow-hidden flex items-center justify-center">
                {avatarPreview ? (
                  <img src={avatarPreview} alt="Avatar" className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-bold text-white/80">
                    {user.address?.slice(2, 4).toUpperCase()}
                  </span>
                )}
              </div>
            </div>
            <div className="absolute inset-0 rounded-2xl bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <Camera className="w-5 h-5 text-white" />
            </div>
          </div>
          <input
            ref={avatarInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => handleImageChange(e, setAvatarPreview, setAvatarFile)}
          />
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
              disabled={isSaving}
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
