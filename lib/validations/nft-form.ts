import { z } from 'zod';

export const nftFormSchema = z.object({
  name: z.string()
    .min(1, 'Name is required')
    .min(3, 'Name must be at least 3 characters')
    .max(100, 'Name must be less than 100 characters'),
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
  price: z.string()
    .min(1, 'Price is required')
    .refine((val) => {
      const num = parseFloat(val);
      return !isNaN(num) && num > 0;
    }, 'Price must be a positive number'),
  currency: z.string().default('ETH'),
  properties: z.array(
    z.object({
      trait_type: z.string().min(1, 'Property name is required'),
      value: z.string().min(1, 'Property value is required')
    })
  ).default([])
});

export type NFTFormInput = z.input<typeof nftFormSchema>;
export type NFTFormData = z.output<typeof nftFormSchema>;
