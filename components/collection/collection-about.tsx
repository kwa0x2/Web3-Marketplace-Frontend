'use client';

import { useState } from 'react';
import { Pencil, X, Check, Loader2 } from 'lucide-react';
import { CollectionDetail } from '@/hooks/useCollections';
import { collectionService } from '@/api/services/collection.service';
import { CopyAddress } from './copy-address';

interface CollectionAboutProps {
  collection: CollectionDetail;
  isOwner?: boolean;
  onDescriptionSaved?: () => Promise<void>;
}

export function CollectionAbout({ collection, isOwner, onDescriptionSaved }: CollectionAboutProps) {
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState(collection.description ?? '');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setError(null);
    try {
      await collectionService.updateDescription(collection.id, draft.trim() || null);
      await onDescriptionSaved?.();
      setEditing(false);
    } catch (err: any) {
      setError(err?.response?.data?.error ?? err?.message ?? 'Failed to save');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    setDraft(collection.description ?? '');
    setError(null);
    setEditing(false);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
      <div className="lg:col-span-3 bg-[#111] rounded-xl p-6 ring-1 ring-white/[0.06]">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-white font-semibold text-lg">Description</h3>
          {isOwner && !editing && (
            <button
              onClick={() => setEditing(true)}
              className="flex items-center gap-1.5 text-xs text-gray-500 hover:text-white transition-colors px-2 py-1 rounded-lg hover:bg-white/[0.06]"
            >
              <Pencil className="w-3.5 h-3.5" />
              Edit
            </button>
          )}
        </div>

        {editing ? (
          <div className="space-y-3">
            <textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              maxLength={1000}
              rows={5}
              placeholder="Describe your collection..."
              className="w-full bg-[#1a1a1a] border border-white/10 rounded-xl px-4 py-3 text-sm text-gray-200 placeholder-gray-600 resize-none focus:outline-none focus:ring-1 focus:ring-purple-500/50"
            />
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-600">{draft.length} / 1000</span>
              <div className="flex gap-2">
                <button
                  onClick={handleCancel}
                  disabled={saving}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-gray-400 hover:text-white border border-white/10 hover:border-white/20 rounded-lg transition-colors"
                >
                  <X className="w-3.5 h-3.5" />
                  Cancel
                </button>
                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-white bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors disabled:opacity-50"
                >
                  {saving ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Check className="w-3.5 h-3.5" />
                  )}
                  Save
                </button>
              </div>
            </div>
            {error && (
              <p className="text-xs text-red-400 bg-red-500/10 border border-red-500/20 rounded-lg px-3 py-2">
                {error}
              </p>
            )}
          </div>
        ) : collection.description ? (
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
