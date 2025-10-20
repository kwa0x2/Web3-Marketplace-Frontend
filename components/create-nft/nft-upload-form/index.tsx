'use client';

import { useState, useRef, ChangeEvent } from 'react';
import { useAccount } from 'wagmi';
import Image from 'next/image';

interface NFTUploadFormProps {
  onBack: () => void;
  chainId: string;
}

interface NFTFormData {
  name: string;
  description: string;
  royalties: string;
  supply: string;
  properties: { trait_type: string; value: string }[];
  unlockableContent: string;
  explicitContent: boolean;
}

export function NFTUploadForm({ onBack, chainId }: NFTUploadFormProps) {
  const { address } = useAccount();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const [formData, setFormData] = useState<NFTFormData>({
    name: '',
    description: '',
    royalties: '10',
    supply: '1',
    properties: [],
    unlockableContent: '',
    explicitContent: false,
  });

  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'audio/mpeg'];
      if (!validTypes.includes(selectedFile.type)) {
        alert('Please select a valid file type (JPEG, PNG, GIF, WebP, MP4, MP3)');
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
        alert('Please select a valid file type (JPEG, PNG, GIF, WebP, MP4, MP3)');
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
    setUploadProgress(0);

    try {
      const progressInterval = setInterval(() => {
        setUploadProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + 10;
        });
      }, 200);

      const formDataToSend = new FormData();
      formDataToSend.append('file', file);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('royalties', formData.royalties);
      formDataToSend.append('supply', formData.supply);
      formDataToSend.append('properties', JSON.stringify(formData.properties));
      formDataToSend.append('chainId', chainId);
      formDataToSend.append('creator', address || '');

      await new Promise((resolve) => setTimeout(resolve, 2000));

      clearInterval(progressInterval);
      setUploadProgress(100);

      alert('NFT created successfully! (This is a demo - implement actual minting logic)');

      setFile(null);
      setFilePreview('');
      setFormData({
        name: '',
        description: '',
        royalties: '10',
        supply: '1',
        properties: [],
        unlockableContent: '',
        explicitContent: false,
      });
      setUploadProgress(0);
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to create NFT. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-2">
          Upload Your NFT
        </h2>
        <p className="text-gray-300">
          Fill in the details and upload your digital asset
        </p>
      </div>

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
                setFile(null);
                setFilePreview('');
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

      <div>
        <label className="block text-white font-semibold mb-2">
          Name <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="e.g., Awesome Digital Art #1"
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
          required
        />
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">
          Description
        </label>
        <textarea
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Describe your NFT..."
          rows={4}
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
        />
      </div>

      <div>
        <label className="block text-white font-semibold mb-2">
          Royalties (%)
        </label>
        <input
          type="number"
          value={formData.royalties}
          onChange={(e) => setFormData({ ...formData, royalties: e.target.value })}
          min="0"
          max="50"
          step="0.1"
          className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors"
        />
        <p className="text-xs text-gray-400 mt-1">
          Suggested: 5-10%. You'll receive this percentage of sales on secondary markets.
        </p>
      </div>

      <div>
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="flex items-center space-x-2 text-purple-400 hover:text-purple-300 transition-colors"
        >
          <span className="font-semibold">Advanced Options</span>
          <svg
            className={`w-5 h-5 transition-transform ${showAdvanced ? 'rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {showAdvanced && (
        <div className="space-y-6 bg-gray-800/30 rounded-xl p-6 border border-gray-700">
          <div>
            <label className="block text-white font-semibold mb-2">
              Properties (Optional)
            </label>
            <div className="space-y-3">
              {formData.properties.map((prop, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <input
                    type="text"
                    value={prop.trait_type}
                    onChange={(e) => updateProperty(index, 'trait_type', e.target.value)}
                    placeholder="e.g., Background"
                    className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-sm"
                  />
                  <input
                    type="text"
                    value={prop.value}
                    onChange={(e) => updateProperty(index, 'value', e.target.value)}
                    placeholder="e.g., Blue"
                    className="flex-1 px-3 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-sm"
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

          <div>
            <label className="block text-white font-semibold mb-2">
              Unlockable Content (Optional)
            </label>
            <textarea
              value={formData.unlockableContent}
              onChange={(e) => setFormData({ ...formData, unlockableContent: e.target.value })}
              placeholder="Content that will be revealed to the buyer (e.g., access codes, links)"
              rows={3}
              className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 transition-colors resize-none"
            />
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              id="explicitContent"
              checked={formData.explicitContent}
              onChange={(e) => setFormData({ ...formData, explicitContent: e.target.checked })}
              className="w-5 h-5 rounded border-gray-700 bg-gray-800 text-purple-600 focus:ring-purple-500 focus:ring-offset-gray-900"
            />
            <label htmlFor="explicitContent" className="text-white">
              Explicit & Sensitive Content
            </label>
          </div>
        </div>
      )}

      {isUploading && (
        <div className="bg-gray-800/50 rounded-lg p-4 border border-gray-700">
          <div className="flex items-center justify-between mb-2">
            <span className="text-white font-semibold">Creating NFT...</span>
            <span className="text-purple-400 font-semibold">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-gradient-to-r from-purple-600 to-pink-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${uploadProgress}%` }}
            />
          </div>
        </div>
      )}

      <div className="flex items-center justify-between pt-4">
        <button
          type="button"
          onClick={onBack}
          disabled={isUploading}
          className="px-6 py-3 rounded-lg font-semibold text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          ← Back
        </button>

        <button
          type="submit"
          disabled={isUploading || !file || !formData.name.trim()}
          className="px-8 py-3 rounded-lg font-semibold bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
        >
          {isUploading ? 'Creating NFT...' : 'Create NFT'}
        </button>
      </div>
    </form>
  );
}
