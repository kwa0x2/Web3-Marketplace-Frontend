'use client';

import { useState } from 'react';

interface CreateCollectionModalProps {
  onClose: () => void;
  onCreate: (data: { name: string; symbol: string; description: string }) => void;
}

export function CreateCollectionModal({ onClose, onCreate }: CreateCollectionModalProps) {
  const [form, setForm] = useState({ name: '', symbol: '', description: '' });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
        <h3 className="text-xl font-bold text-white mb-4">Create New Collection</h3>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-400 text-sm mb-2">Collection Name *</label>
            <input
              type="text"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. My Awesome NFTs"
              className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Symbol *</label>
            <input
              type="text"
              value={form.symbol}
              onChange={(e) => setForm({ ...form, symbol: e.target.value.toUpperCase() })}
              placeholder="e.g. MAN"
              maxLength={5}
              className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-gray-400 text-sm mb-2">Description (Optional)</label>
            <textarea
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Describe your collection..."
              rows={3}
              className="w-full px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 resize-none"
            />
          </div>
        </div>

        <div className="flex space-x-3 mt-6">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 py-2 rounded-lg bg-gray-700 text-white hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => onCreate(form)}
            disabled={!form.name || !form.symbol}
            className="flex-1 py-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Create
          </button>
        </div>
      </div>
    </div>
  );
}
