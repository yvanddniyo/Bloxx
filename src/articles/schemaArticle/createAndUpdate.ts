import { categoriesRole } from 'src/helpers/data';
import { optional, z } from 'zod';

const CategoriesRole = ['TUTORIAL', 'TECH_NEWS', 'FINANCE'] as const;

export const createAndUpdateSchema = z.object({
  title: z
    .string()
    .min(4, 'Title must be at least 4 characters long')
    .max(200, 'Title cannot exceed 200 characters'),

  description: z
    .string()
    .min(15, 'Description must be at least 15 characters long')
    .max(500, 'Description cannot exceed 500 characters')
    .optional(),

  body: z.string().min(200, 'Body must be at least 200 characters long'),

  category: z.nativeEnum(categoriesRole),

  published: z
    .union([z.string(), z.boolean()])
    .transform((val) =>
      typeof val === 'string' ? val.toLowerCase() === 'true' : val,
    ),
});

export type createArticleDto = z.infer<typeof createAndUpdateSchema>;

export const updateArticleSchema = z.object({
  imageUrl: z.string().url('Image URL must be a valid URL').optional(),
  title: z
    .string()
    .min(4, 'Title must be at least 4 characters long')
    .max(200, 'Title cannot exceed 200 characters')
    .optional(),
  description: z
    .string()
    .min(4, 'Title must be at least 4 characters long')
    .max(200, 'Title cannot exceed 200 characters')
    .optional(),
  body: z
    .string()
    .min(200, 'Body must be at least 200 characters long')
    .optional(),
  published: z
    .union([z.string(), z.boolean()])
    .transform((val) =>
      typeof val === 'string' ? val.toLowerCase() === 'true' : val,
    )
    .optional(),
});
