"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookController = void 0;
const book_service_1 = require("../services/book.service");
// Create a new book
const createBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield book_service_1.BookService.createBook(req.body);
        res.status(201).json({
            success: true,
            message: 'Book created successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// Get all books with pagination
const getAllBooks = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { filter = "", sortBy = 'createdAt', sort = 'desc', limit = 10, page = 1 } = req.query;
        const result = yield book_service_1.BookService.getAllBooks(filter, sortBy, sort, Number(limit), Number(page));
        res.status(200).json({
            success: true,
            message: 'Books retrieved successfully',
            meta: {
                page: Number(page),
                limit: Number(limit),
                total: result.totalCount,
                totalPages: Math.ceil(result.totalCount / Number(limit)),
            },
            data: result.books,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.default = { getAllBooks };
// Get a book by ID
const getBookById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const result = yield book_service_1.BookService.getBookById(bookId);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
                error: {
                    code: 404,
                    description: 'Book not found!',
                },
            });
        }
        res.status(200).json({
            success: true,
            message: 'Book retrieved successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// Update a book
const updateBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const result = yield book_service_1.BookService.updateBook(bookId, req.body);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
                error: {
                    code: 404,
                    description: 'Book not found!',
                },
            });
        }
        res.status(200).json({
            success: true,
            message: 'Book updated successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// Delete a book
const deleteBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { bookId } = req.params;
        const result = yield book_service_1.BookService.deleteBook(bookId);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Book not found',
                error: {
                    code: 404,
                    description: 'Book not found!',
                },
            });
        }
        res.status(200).json({
            success: true,
            message: 'Book deleted successfully',
            data: null,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.BookController = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
};
