import { z } from "zod";
import { Genre } from "../interfaces/book.interface";

// Create book validation schema
export const createBookValidationSchema = z.object({
  body: z.object({
    title: z
      .string({
        message: "Title is required",
      })
      .min(1, "Title cannot be empty")
      .trim(),

    author: z
      .string({
        message: "Author is required",
      })
      .min(1, "Author cannot be empty")
      .trim(),

    genre: z.enum(Object.values(Genre) as [string, ...string[]], {
      message: "Invalid genre provided",
    }),

    isbn: z
      .string({
        message: "ISBN is required",
      })
      .min(1, "ISBN cannot be empty")
      .trim(),

    description: z.string().trim().optional(),

    copies: z
      .number({
        message: "Copies must be a number",
      })
      .int("Copies must be an integer")
      .min(0, "Copies must be a non-negative number"),

    available: z.boolean().optional(),
    image: z.string().optional(),
    publishedYear: z.number().optional(),
  }),
});

// Update book validation schema (all fields optional)
export const updateBookValidationSchema = z.object({
  body: z.object({
    title: z.string().min(1, "Title cannot be empty").trim().optional(),
    author: z.string().min(1, "Author cannot be empty").trim().optional(),
    genre: z.enum(Object.values(Genre) as [string, ...string[]]).optional(),
    isbn: z.string().min(1, "ISBN cannot be empty").trim().optional(),
    description: z.string().trim().optional(),
    copies: z
      .number()
      .int("Copies must be an integer")
      .min(0, "Copies must be a non-negative number")
      .optional(),
    available: z.boolean().optional(),
    image: z.string().optional(),
    publishedYear: z.number().optional(),
  }),
});

// Book ID param validation
export const bookIdValidationSchema = z.object({
  params: z.object({
    bookId: z
      .string({
        message: "Book ID is required",
      })
      .regex(/^[0-9a-fA-F]{24}$/, "Invalid book ID format"),
  }),
});

export type CreateBookInput = z.infer<typeof createBookValidationSchema>;
export type UpdateBookInput = z.infer<typeof updateBookValidationSchema>;
export type BookIdInput = z.infer<typeof bookIdValidationSchema>;
