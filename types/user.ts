export interface User {
  id: string;
  address: string;
  chainId?: number;
  avatar?: string;
  bio?: string;
  website?: string;
  twitter?: string;
  createdAt: string;
  lastLoginAt?: string;
  updatedAt?: string;
}
