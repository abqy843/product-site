import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

export const collections = {
  products: defineCollection({
    loader: glob({ pattern: '**/*.json', base: './src/content/products' }),
    schema: z.object({
      name: z.string(),
      category: z.string(),
      description: z.string(),
      details: z.string(),
      price: z.number().int().min(0),
      image: z.string(),
      specs: z.object({
        spec1Key: z.string(),
        spec1Value: z.string(),
        spec2Key: z.string(),
        spec2Value: z.string(),
        spec3Key: z.string(),
        spec3Value: z.string(),
        spec4Key: z.string(),
        spec4Value: z.string(),
      }),
    }),
  }),
};
