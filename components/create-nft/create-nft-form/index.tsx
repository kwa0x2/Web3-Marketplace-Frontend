'use client';

import { useState, useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAccount, useChainId } from 'wagmi';

import { FileUpload } from '../file-upload';
import { CollectionSelector } from '../collection-selector';
import { CategorySelector } from '../category-selector';
import { NFTPreviewCard } from '../nft-preview-card';
import { nftFormSchema, type NFTFormInput, type NFTFormData } from '@/lib/validations/nft-form';
import { useNFTMint } from '@/hooks/useNFTMint';

import { chains } from './constants';
import { NetworkInfo } from './network-info';
import { MarketplaceToggle } from './marketplace-toggle';
import { UnlockableContent } from './unlockable-content';
import { AdvancedSettings } from './advanced-settings';
import { MintStatus } from './mint-status';

export function CreateNFTForm() {
  const { address } = useAccount();
  const chainId = useChainId();

  const [file, setFile] = useState<File | null>(null);
  const [filePreview, setFilePreview] = useState<string>('');
  const [showAdvanced, setShowAdvanced] = useState(false);
  const { mint, step: mintStep, error: mintError, result: mintResult, reset: resetMint } = useNFTMint();

  const currentChain = chains.find(c => c.id === chainId);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<NFTFormInput>({
    resolver: zodResolver(nftFormSchema),
    defaultValues: {
      name: '',
      description: '',
      category: '',
      collection: '',
      royalties: '10',
      putOnMarketplace: false,
      price: '',
      currency: 'ETH',
      expirationDays: '30',
      unlockOnce: false,
      unlockableContent: '',
      properties: []
    }
  });

  const formValues = watch();

  const handleFileSelect = useCallback((selectedFile: File) => {
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
  }, []);

  const handleFileClear = useCallback(() => {
    setFile(null);
    setFilePreview('');
  }, []);

  const addProperty = () => {
    setValue('properties', [...(formValues.properties || []), { trait_type: '', value: '' }]);
  };

  const updateProperty = (index: number, field: 'trait_type' | 'value', value: string) => {
    const newProperties = [...(formValues.properties || [])];
    newProperties[index][field] = value;
    setValue('properties', newProperties);
  };

  const removeProperty = (index: number) => {
    const newProperties = (formValues.properties || []).filter((_, i) => i !== index);
    setValue('properties', newProperties);
  };

  const isUploading = mintStep !== 'idle' && mintStep !== 'done' && mintStep !== 'error';

  const onSubmit = async (data: NFTFormData) => {
    if (!file) {
      alert('Please select a file');
      return;
    }

    if (mintStep === 'error') {
      resetMint();
      return;
    }

    await mint({
      file,
      name: data.name,
      description: data.description,
      category: data.category,
      royalties: parseFloat(data.royalties),
      properties: data.properties?.filter(p => p.trait_type && p.value),
    });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit as any)} className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Create New NFT</h1>
          <p className="text-gray-400">Single edition on {currentChain?.name || 'Ethereum'}</p>
        </div>

        <NetworkInfo chainName={currentChain?.name} chainIcon={currentChain?.icon} />

        <div>
          <label className="block text-white font-semibold mb-3">Upload file *</label>
          <FileUpload
            onFileSelect={handleFileSelect}
            file={file}
            preview={filePreview}
            onClear={handleFileClear}
          />
        </div>

        <div>
          <label className="block text-white font-semibold mb-3">Name *</label>
          <input
            {...register('name')}
            type="text"
            placeholder='e.g. "Redeemable T-Shirt with logo"'
            className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-900/80 transition-all"
          />
          {errors.name && (
            <p className="mt-2 text-sm text-red-400">{errors.name.message}</p>
          )}
        </div>

        <div>
          <label className="block text-white font-semibold mb-3">
            Description <span className="text-gray-400 font-normal text-sm">(Optional)</span>
          </label>
          <div className="text-gray-400 text-xs mb-2">
            With preserved line-breaks
          </div>
          <textarea
            {...register('description')}
            placeholder={'e.g. "After purchasing you\'ll be able to get the real T-Shirt"'}
            rows={4}
            className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-purple-500 focus:bg-gray-900/80 transition-all resize-none"
          />
          {errors.description && (
            <p className="mt-2 text-sm text-red-400">{errors.description.message}</p>
          )}
        </div>

        <CategorySelector
          value={formValues.category}
          onChange={(value) => setValue('category', value)}
        />
        {errors.category && (
          <p className="mt-2 text-sm text-red-400">{errors.category.message}</p>
        )}

        <CollectionSelector
          value={formValues.collection || ''}
          onChange={(value) => setValue('collection', value)}
        />

        <div>
          <label className="block text-white font-semibold mb-3">Royalties</label>
          <div className="relative">
            <input
              {...register('royalties')}
              type="number"
              min="0"
              max="50"
              step="0.1"
              className="w-full px-4 py-3 rounded-xl bg-gray-900/60 border border-gray-600 text-white focus:outline-none focus:border-purple-500 focus:bg-gray-900/80 transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">%</span>
          </div>
          <p className="text-gray-400 text-xs mt-2">
            Suggested: 0%, 10%, 20%, 30%. Maximum is 50%
          </p>
          {errors.royalties && (
            <p className="mt-2 text-sm text-red-400">{errors.royalties.message}</p>
          )}
        </div>

        <MarketplaceToggle
          register={register}
          putOnMarketplace={formValues.putOnMarketplace ?? false}
          price={formValues.price ?? ''}
          currency={formValues.currency ?? 'ETH'}
          priceError={errors.price?.message}
        />

        <UnlockableContent
          register={register}
          unlockOnce={formValues.unlockOnce ?? false}
        />

        <AdvancedSettings
          showAdvanced={showAdvanced}
          onToggle={() => setShowAdvanced(!showAdvanced)}
          properties={formValues.properties || []}
          onAddProperty={addProperty}
          onUpdateProperty={updateProperty}
          onRemoveProperty={removeProperty}
        />

        <MintStatus
          mintStep={mintStep}
          mintError={mintError}
          txHash={mintResult?.txHash}
          isUploading={isUploading}
          hasFile={!!file}
        />
      </div>

      <NFTPreviewCard
        name={formValues.name}
        description={formValues.description || ''}
        price={formValues.price}
        currency={formValues.currency}
        imagePreview={filePreview}
        category={formValues.category}
        royalties={formValues.royalties}
        properties={formValues.properties || []}
      />
    </form>
  );
}
