export interface NFTUploadFormProps {
  onBack: () => void;
  chainId: string;
}

export interface NFTFormData {
  name: string;
  description: string;
  royalties: string;
  supply: string;
  properties: { trait_type: string; value: string }[];
  unlockableContent: string;
  explicitContent: boolean;
}
