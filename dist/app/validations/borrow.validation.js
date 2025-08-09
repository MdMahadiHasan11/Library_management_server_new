"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createBorrowValidationSchema = void 0;
const zod_1 = require("zod");
// Create borrow validation schema
exports.createBorrowValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        book: zod_1.z.string({
            message: 'Book ID is required',
        }).regex(/^[0-9a-fA-F]{24}$/, 'Invalid book ID format'),
        quantity: zod_1.z.number({
            message: 'Quantity must be a number',
        }).int('Quantity must be an integer').min(1, 'Quantity must be at least 1'),
        dueDate: zod_1.z.string({
            message: 'Due date is required',
        }).datetime('Invalid date format. Use ISO 8601 format (YYYY-MM-DDTHH:mm:ss.sssZ)').or(zod_1.z.date()).transform((val) => new Date(val)),
    }),
});
