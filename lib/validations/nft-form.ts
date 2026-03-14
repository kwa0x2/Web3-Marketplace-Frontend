import { z } from 'zod';

export const nftFormSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must be less than 100 characters'),
  category: z.string()
    .min(1, 'Please select a category'),
  description: z.string()
    .max(1000, 'Description must be less than 1000 characters')
    .optional(),
  collection: z.string().optional(),
  royalties: z.string()
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num >= 0 && num <= 50;
    }, 'Royalties must be between 0% and 50%')
    .default('10'),
  putOnMarketplace: z.boolean().default(false),
  price: z.string().optional()
    .refine((val) => {
      if (!val) return true;
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    }, 'Price must be a positive number'),
  currency: z.string().default('ETH'),
  listingExpiration: z.string().optional(),
  expirationDays: z.string().default('30'),
  unlockOnce: z.boolean().default(false),
  unlockableContent: z.string()
    .max(500, 'Unlockable content must be less than 500 characters')
    .optional(),
  properties: z.array(
    z.object({
      trait_type: z.string().min(1, 'Property name is required'),
      value: z.string().min(1, 'Property value is required')
    })
  ).default([])
}).refine((data) => {
  if (data.putOnMarketplace && !data.price) {
    return false;
  }
  return true;
}, {
  message: 'Price is required when listing on marketplace',
  path: ['price']
});

export type NFTFormInput = z.input<typeof nftFormSchema>;
export type NFTFormData = z.output<typeof nftFormSchema>;
