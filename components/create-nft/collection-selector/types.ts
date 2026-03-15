export interface Collection {
  id: string;
  name: string;
  symbol: string;
  image?: string;
  itemCount?: number;
}

export interface CollectionSelectorProps {
  value: string;
  onChange: (collectionId: string) => void;
}
