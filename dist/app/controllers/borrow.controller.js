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
exports.BorrowController = void 0;
const borrow_service_1 = require("../services/borrow.service");
// Borrow a book
const borrowBook = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield borrow_service_1.BorrowService.borrowBook(req.body);
        res.status(201).json({
            success: true,
            message: 'Book borrowed successfully',
            data: result,
        });
    }
    catch (error) {
        next(error);
    }
});
// Get borrowed books summary
const getBorrowedBooksSummary = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { page = 1, limit = 10 } = req.query;
        const result = yield borrow_service_1.BorrowService.getBorrowedBooksSummary(Number(page), Number(limit));
        res.status(200).json({
            success: true,
            message: 'Borrowed books summary retrieved successfully',
            meta: {
                page: Number(page),
                limit: Number(limit),
                total: result.totalCount,
                totalPages: Math.ceil(result.totalCount / Number(limit)),
            },
            data: result.summary,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.BorrowController = {
    borrowBook,
    getBorrowedBooksSummary,
};
