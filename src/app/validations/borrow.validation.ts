import { z } from 'zod';

// Create borrow validation schema
export const createBorrowValidationSchema = z.object({
  body: z.object({
    book: z.string({
      message: 'Book ID is required',
    }).regex(/^[0-9a-fA-F]{24}$/, 'Invalid book ID format'),
    
    quantity: z.number({
      message: 'Quantity must be a number',
    }).int('Quantity must be an integer').min(1, 'Quantity must be at least 1'),
    
    dueDate: z.string({
      message: 'Due date is required',
    }).datetime('Invalid date format. Use ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)').or(
      z.date()
    ).transform((val) => new Date(val)),
  }),
});

export type CreateBorrowInput = z.infer<typeof createBorrowValidationSchema>;