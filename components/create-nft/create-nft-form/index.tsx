'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { useAccount, useChainId, useSwitchChain } from 'wagmi';
import { mainnet, sepolia, polygon, arbitrum, optimism, base } from 'wagmi/chains';
import { useAuth } from '@/hooks/useAuth';
import Image from 'next/image';

interface NFTFormData {
  name: string;
  description: string;
  royalties: string;
  putOnMarketplace: boolean;
  price: string;
  currency: string;
  listingExpiration: string;
  expirationDays: string;
  unlockOnce: boolean;
  unlockableContent: string;
  properties: { trait_type: string; value: string }[];
}

const chains = [
  { id: mainnet.id, name: 'Ethereum', icon: '⟠' },
  { id: sepolia.id, name: 'Sepolia', icon: '⟠' },
  { id: polygon.id, name: 'Polygon', icon: '⬡' },
  { id: arbitrum.id, name: 'Arbitrum', icon: '◆' },
  { id: optimism.id, name: 'Optimism', icon: '🔴' },
  { id: base.id, name: 'Base', icon: '🔵' },
];

const currencies = ['ETH', 'WETH', 'USDC', 'USDT', 'DAI'];

export function CreateNFTForm() {
  const { address } = useAccount();
  const chainId = useChainId();
  const { switchChain } = useSwitchChain();
  const { isAuthenticated, user } = useAuth();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [formData, setFormData] = useState<NFTFormData>({
    name: '',
    description: '',
    royalties: '10',
    putOnMarketplace: false,
    price: '',
    currency: 'ETH',
    listingExpiration: '',
    expirationDays: '30',
    unlockOnce: false,
    unlockableContent: '',
    properties: [],
  });

  const currentChain = chains.find(c => c.id === chainId);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'audio/mpeg'];
      if (!validTypes.includes(selectedFile.type)) {
        alert('Please select a valid file type (PNG, GIF, WEBP, MP4, or MP3)');
        return;
      }

      if (selectedFile.size > 100 * 1024 * 1024) {
        alert('File size must be less than 100MB');
        return;
      }

      setFile(selectedFile);

      if (selectedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(selectedFile);
      } else {
        setFilePreview('');
      }
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
    if (droppedFile) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'audio/mpeg'];
      if (!validTypes.includes(droppedFile.type)) {
        alert('Please select a valid file type (PNG, GIF, WEBP, MP4, or MP3)');
        return;
      }

      if (droppedFile.size > 100 * 1024 * 1024) {
        alert('File size must be less than 100MB');
        return;
      }

      setFile(droppedFile);

      if (droppedFile.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setFilePreview(reader.result as string);
        };
        reader.readAsDataURL(droppedFile);
      } else {
        setFilePreview('');
      }
    }
  };

  const addProperty = () => {
    setFormData({
      ...formData,
      properties: [...formData.properties, { trait_type: '', value: '' }],
    });
  };

  const updateProperty = (index: number, field: 'trait_type' | 'value', value: string) => {
    const newProperties = [...formData.properties];
    newProperties[index][field] = value;
    setFormData({ ...formData, properties: newProperties });
  };

  const removeProperty = (index: number) => {
    const newProperties = formData.properties.filter((_, i) => i !== index);
    setFormData({ ...formData, properties: newProperties });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file');
      return;
    }

    if (!formData.name.trim()) {
      alert('Please enter a name for your NFT');
      return;
    }

    setIsUploading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      alert('NFT created successfully! (Demo mode)');
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to create NFT. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Create New NFT</h1>
          <p className="text-gray-400">Single edition on {currentChain?.name || 'Ethereum'}</p>
        </div>

        <div className="relative overflow-hidden bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm rounded-xl p-5 border border-purple-500/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-2xl shadow-lg shadow-purple-500/30">
                {currentChain?.icon}
              </div>
              <div>
                <p className="text-xs text-purple-300 font-medium mb-1">Network</p>
                <p className="text-white font-bold text-lg">{currentChain?.name}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
              <span className="text-green-400 text-sm font-semibold">Connected</span>
            </div>
          </div>
        </div>

        <div>
          <label className="block text-white font-semibold mb-3">Upload file</label>
          <div
            onDragOver={handleDragOver}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-gray-700 rounded-xl p-8 hover:border-purple-500/60 transition-colors cursor-pointer bg-gray-800/30 text-center"
          >
            <input
              ref={fileInputRef}
              type="file"
              onChange={handleFileSelect}
              accept="image/*,video/mp4,audio/mpeg"
              className="hidden"
            />
            <p className="text-gray-400 text-sm mb-1">
              PNG, GIF, WEBP, MP4 or MP3. Max 100mb.
            </p>
            <button
              type="button"
              className="mt-2 px-6 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm font-semibold transition-colors"
            >
              Choose File
            </button>
          </div>
          {file && (
            <div className="mt-3 bg-gray-800/50 rounded-lg p-3 border border-gray-700">
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
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                    setFilePreview('');
                  }}
                  className="text-red-400 hover:text-red-300"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-white font-semibold">Put on marketplace</h3>
              <p className="text-gray-400 text-sm">Enter price to allow users instantly purchase your NFT</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.putOnMarketplace}
                onChange={(e) => setFormData({ ...formData, putOnMarketplace: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {formData.putOnMarketplace && (
            <div className="mt-4 space-y-3">
              <div>
                <label className="block text-gray-400 text-sm mb-2">Price</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="Enter price"
                    step="0.001"
                    className="flex-1 px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-900/80 transition-all"
                  />
                  <select
                    value={formData.currency}
                    onChange={(e) => setFormData({ ...formData, currency: e.target.value })}
                    className="px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-600 text-white focus:outline-none focus:border-purple-500 focus:bg-gray-900/80 transition-all"
                  >
                    {currencies.map(cur => (
                      <option key={cur} value={cur}>{cur}</option>
                    ))}
                  </select>
                </div>
              </div>

              {formData.price && (
                <div className="bg-gray-900/50 rounded-lg p-3 space-y-1 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price</span>
                    <span className="text-white">~ {formData.price} {formData.currency}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Fee ~</span>
                    <span className="text-white">1.75%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">You will receive</span>
                    <span className="text-white">~ {formData.price} {formData.currency}</span>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-gray-400 text-sm mb-2">Date of listing expiration</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="datetime-local"
                    value={formData.listingExpiration}
                    onChange={(e) => setFormData({ ...formData, listingExpiration: e.target.value })}
                    className="flex-1 px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-600 text-white focus:outline-none focus:border-purple-500 focus:bg-gray-900/80 transition-all"
                  />
                  <select
                    value={formData.expirationDays}
                    onChange={(e) => setFormData({ ...formData, expirationDays: e.target.value })}
                    className="px-4 py-2 rounded-lg bg-gray-900/60 border border-gray-600 text-white focus:outline-none focus:border-purple-500 focus:bg-gray-900/80 transition-all"
                  >
                    <option value="7">7 days</option>
                    <option value="14">14 days</option>
                    <option value="30">30 days</option>
                    <option value="60">60 days</option>
                    <option value="90">90 days</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="bg-gray-800/50 backdrop-blur-sm rounded-xl p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <div>
              <h3 className="text-white font-semibold flex items-center">
                <span className="text-purple-400 mr-2">Unlock once purchased</span>
              </h3>
              <p className="text-gray-400 text-sm">Content will be unlocked after successful transaction</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={formData.unlockOnce}
                onChange={(e) => setFormData({ ...formData, unlockOnce: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-700 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
            </label>
          </div>

          {formData.unlockOnce && (
            <textarea
              value={formData.unlockableContent}
              onChange={(e) => setFormData({ ...formData, unlockableContent: e.target.value })}
              placeholder="e.g. 'After purchasing you'll be able to get the real T-Shirt'"
              rows={3}
              className="w-full mt-3 px-4 py-3 rounded-lg bg-gray-900/60 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-900/80 transition-all resize-none text-sm"
            />
          )}
        </div>



        <div>
          <label className="block text-white font-semibold mb-3">Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder='e.g. "Redeemable T-Shirt with logo"'
            className="w-full px-4 py-3 rounded-lg bg-gray-900/60 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-900/80 transition-all"
            required
          />
        </div>

        <div>
          <label className="block text-white font-semibold mb-3">
            Description <span className="text-gray-400 font-normal text-sm">(Optional)</span>
          </label>
          <div className="text-gray-400 text-xs mb-2">
            With preserved line-breaks
          </div>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder='e.g. "After purchasing you\ll be able to get the real T-Shirt'
            rows={4}
            className="w-full px-4 py-3 rounded-lg bg-gray-900/60 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-900/80 transition-all resize-none"
          />
        </div>

        <div>
          <label className="block text-white font-semibold mb-3">Royalties</label>
          <div className="relative">
            <input
              type="number"
              value={formData.royalties}
              onChange={(e) => setFormData({ ...formData, royalties: e.target.value })}
              min="0"
              max="50"
              step="0.1"
              className="w-full px-4 py-3 rounded-lg bg-gray-900/60 border border-gray-600 text-white focus:outline-none focus:border-purple-500 focus:bg-gray-900/80 transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">%</span>
          </div>
          <p className="text-gray-400 text-xs mt-2">
            Suggested: 0%, 10%, 20%, 30%. Maximum is 50%
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-blue-400 hover:text-blue-300 font-semibold text-sm transition-colors"
        >
          {showAdvanced ? '▼' : '▶'} Show advanced settings
        </button>

        {showAdvanced && (
          <div className="space-y-4 bg-gray-800/30 rounded-xl p-6 border border-gray-700">
            <div>
              <label className="block text-white font-semibold mb-3">Properties</label>
              <div className="space-y-3">
                {formData.properties.map((prop, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <input
                      type="text"
                      value={prop.trait_type}
                      onChange={(e) => updateProperty(index, 'trait_type', e.target.value)}
                      placeholder="e.g., Size"
                      className="flex-1 px-3 py-2 rounded-lg bg-gray-900/60 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-900/80 transition-all text-sm"
                    />
                    <input
                      type="text"
                      value={prop.value}
                      onChange={(e) => updateProperty(index, 'value', e.target.value)}
                      placeholder="e.g., M"
                      className="flex-1 px-3 py-2 rounded-lg bg-gray-900/60 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-900/80 transition-all text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => removeProperty(index)}
                      className="p-2 text-red-400 hover:text-red-300 transition-colors"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={addProperty}
                  className="text-purple-400 hover:text-purple-300 text-sm font-semibold transition-colors"
                >
                  + Add Property
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isUploading || !file || !formData.name.trim()}
          className="w-full py-4 rounded-xl font-bold text-lg bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isUploading ? 'Creating NFT...' : 'Create item'}
        </button>
      </div>

      {/* Right Column - Preview */}
      <div className="lg:sticky lg:top-8 lg:self-start">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-2xl p-6 border border-purple-500/20">
          <h3 className="text-xl font-bold text-white mb-4">Preview</h3>

          <div className="bg-gray-900/50 rounded-xl overflow-hidden">
            {/* Image Preview */}
            <div className="aspect-square bg-gray-800 flex items-center justify-center border-b border-gray-700">
              {filePreview ? (
                <Image
                  src={filePreview}
                  alt="NFT Preview"
                  width={500}
                  height={500}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="text-center p-8">
                  <svg className="w-20 h-20 mx-auto text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <p className="text-gray-500 text-sm">
                    Upload file and choose<br />
                    collection to see preview
                  </p>
                  <p className="text-gray-600 text-xs mt-2">
                    brand new NFT
                  </p>
                </div>
              )}
            </div>

            {/* NFT Info */}
            <div className="p-4">
              <h4 className="text-white font-bold text-lg mb-1">
                {formData.name || 'NFT Name'}
              </h4>
              {formData.price && formData.putOnMarketplace && (
                <p className="text-purple-400 font-semibold">
                  {formData.price} {formData.currency}
                </p>
              )}
              {formData.description && (
                <p className="text-gray-400 text-sm mt-2 line-clamp-3">
                  {formData.description}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
