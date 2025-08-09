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
exports.BookService = void 0;
const book_model_1 = require("../models/book.model");
// Create a new book
const createBook = (bookData) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.create(bookData);
    return result;
});
// Get all books with filtering, sorting and pagination
const getAllBooks = (filter_1, ...args_1) => __awaiter(void 0, [filter_1, ...args_1], void 0, function* (filter, sortBy = "createdAt", sort = "desc", limit = 10, page = 1) {
    const query = {};
    if (filter) {
        query.genre = filter;
    }
    const sortOptions = {};
    sortOptions[sortBy] = sort === "desc" ? -1 : 1;
    const skip = (page - 1) * limit;
    const totalCount = yield book_model_1.Book.countDocuments(query);
    const books = yield book_model_1.Book.find(query)
        .sort(sortOptions)
        .skip(skip)
        .limit(limit)
        .lean();
    return {
        books,
        totalCount,
    };
});
// Get a book by ID
const getBookById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findById(id);
    return result;
});
// Update a book
const updateBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
});
// Delete a book
const deleteBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield book_model_1.Book.findOneAndDelete({ _id: new Object(id) });
    return result;
});
exports.BookService = {
    createBook,
    getAllBooks,
    getBookById,
    updateBook,
    deleteBook,
};
