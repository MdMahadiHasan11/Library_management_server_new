"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookQueryValidationSchema = void 0;
const zod_1 = require("zod");
const book_interface_1 = require("../interfaces/book.interface");
exports.bookQueryValidationSchema = zod_1.z.object({
    query: zod_1.z.object({
        filter: zod_1.z.nativeEnum(book_interface_1.Genre).optional(),
        sortBy: zod_1.z.enum(['title', 'author', 'createdAt', 'copies']).optional(),
        sort: zod_1.z.enum(['asc', 'desc']).optional(),
        limit: zod_1.z.string().regex(/^\d+$/, 'Limit must be a positive number').transform(Number).optional(),
    }),
});
