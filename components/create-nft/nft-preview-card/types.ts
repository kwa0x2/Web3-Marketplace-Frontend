export interface NFTPreviewCardProps {
  name: string;
  description: string;
  price?: string;
  currency?: string;
  imagePreview?: string;
  category?: string;
  royalties?: string;
  properties?: { trait_type: string; value: string }[];
}
