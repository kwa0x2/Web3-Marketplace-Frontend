'use client';

import { useState } from 'react';
import { useAccount } from 'wagmi';
import { NFTUploadFormProps, NFTFormData } from './types';
import { UploadDropzone } from './upload-dropzone';
import { AdvancedOptions } from './advanced-options';
import { UploadProgress } from './upload-progress';
import { FormActions } from './form-actions';

export function NFTUploadForm({ onBack, chainId }: NFTUploadFormProps) {
  const { address } = useAccount();

  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const [formData, setFormData] = useState<NFTFormData>({
    name: '',
    description: '',
    royalties: '10',
    supply: '1',
    properties: [],
    unlockableContent: '',
    explicitContent: false,
  });

  const handleFileSelect = (selectedFile: File) => {
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
  };

  const handleFileClear = () => {
    setFile(null);
    setFilePreview('');
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

      <UploadDropzone
        file={file}
        filePreview={filePreview}
        onFileSelect={handleFileSelect}
        onClear={handleFileClear}
      />

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

      <AdvancedOptions
        showAdvanced={showAdvanced}
        onToggle={() => setShowAdvanced(!showAdvanced)}
        formData={formData}
        onFormChange={setFormData}
        onAddProperty={addProperty}
        onUpdateProperty={updateProperty}
        onRemoveProperty={removeProperty}
      />

      <UploadProgress isUploading={isUploading} progress={uploadProgress} />

      <FormActions
        onBack={onBack}
        isUploading={isUploading}
        isDisabled={isUploading || !file || !formData.name.trim()}
      />
    </form>
  );
}
