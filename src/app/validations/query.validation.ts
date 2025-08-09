import { z } from 'zod';
import { Genre } from '../interfaces/book.interface';

export const bookQueryValidationSchema = z.object({
  query: z.object({
    filter: z.nativeEnum(Genre).optional(),
    sortBy: z.enum(['title', 'author', 'createdAt', 'copies']).optional(),
    sort: z.enum(['asc', 'desc']).optional(),
    limit: z.string().regex(/^\d+$/, 'Limit must be a positive number').transform(Number).optional(),
  }),
});

export type BookQueryInput = z.infer<typeof bookQueryValidationSchema>;