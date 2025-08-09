"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookIdValidationSchema = exports.updateBookValidationSchema = exports.createBookValidationSchema = void 0;
const zod_1 = require("zod");
const book_interface_1 = require("../interfaces/book.interface");
// Create book validation schema
exports.createBookValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z
            .string({
            message: "Title is required",
        })
            .min(1, "Title cannot be empty")
            .trim(),
        author: zod_1.z
            .string({
            message: "Author is required",
        })
            .min(1, "Author cannot be empty")
            .trim(),
        genre: zod_1.z.enum(Object.values(book_interface_1.Genre), {
            message: "Invalid genre provided",
        }),
        isbn: zod_1.z
            .string({
            message: "ISBN is required",
        })
            .min(1, "ISBN cannot be empty")
            .trim(),
        description: zod_1.z.string().trim().optional(),
        copies: zod_1.z
            .number({
            message: "Copies must be a number",
        })
            .int("Copies must be an integer")
            .min(0, "Copies must be a non-negative number"),
        available: zod_1.z.boolean().optional(),
        image: zod_1.z.string().optional(),
        publishedYear: zod_1.z.number().optional(),
    }),
});
// Update book validation schema (all fields optional)
exports.updateBookValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().min(1, "Title cannot be empty").trim().optional(),
        author: zod_1.z.string().min(1, "Author cannot be empty").trim().optional(),
        genre: zod_1.z.enum(Object.values(book_interface_1.Genre)).optional(),
        isbn: zod_1.z.string().min(1, "ISBN cannot be empty").trim().optional(),
        description: zod_1.z.string().trim().optional(),
        copies: zod_1.z
            .number()
            .int("Copies must be an integer")
            .min(0, "Copies must be a non-negative number")
            .optional(),
        available: zod_1.z.boolean().optional(),
        image: zod_1.z.string().optional(),
        publishedYear: zod_1.z.number().optional(),
    }),
});
// Book ID param validation
exports.bookIdValidationSchema = zod_1.z.object({
    params: zod_1.z.object({
        bookId: zod_1.z
            .string({
            message: "Book ID is required",
        })
            .regex(/^[0-9a-fA-F]{24}$/, "Invalid book ID format"),
    }),
});
