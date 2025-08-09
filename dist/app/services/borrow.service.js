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
exports.BorrowService = void 0;
const book_model_1 = require("../models/book.model");
const borrow_model_1 = require("../models/borrow.model");
// Borrow a book
const borrowBook = (borrowData) => __awaiter(void 0, void 0, void 0, function* () {
    // Start a session for transaction
    const session = yield borrow_model_1.Borrow.startSession();
    try {
        session.startTransaction();
        // Check if book has enough copies
        const book = yield book_model_1.Book.findById(borrowData.book);
        if (!book) {
            throw new Error("Book not found");
        }
        if (book.copies < borrowData.quantity) {
            throw new Error("Not enough copies available");
        }
        // Update book copies
        book.copies -= borrowData.quantity;
        yield book.save({ session });
        // Update book availability if copies become 0
        if (book.copies === 0) {
            book.available = false;
            yield book.save({ session });
        }
        // Create borrow record
        const result = yield borrow_model_1.Borrow.create([borrowData], { session });
        yield session.commitTransaction();
        session.endSession();
        return result[0];
    }
    catch (error) {
        yield session.abortTransaction();
        session.endSession();
        throw error;
    }
});
// Get borrowed books summary using aggregation
const getBorrowedBooksSummary = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (page = 1, limit = 10) {
    const skip = (page - 1) * limit;
    // Get total count first
    // const totalCount = await Borrow.countDocuments({ returned: false });
    const totalCount = (yield borrow_model_1.Borrow.distinct("book")).length;
    // Get paginated summary
    const summary = yield borrow_model_1.Borrow.aggregate([
        // {
        //   $match: { returned: false } // Only count active borrows
        // },
        {
            $group: {
                _id: "$book",
                totalQuantity: { $sum: "$quantity" },
            },
        },
        {
            $lookup: {
                from: "books",
                localField: "_id",
                foreignField: "_id",
                as: "bookDetails",
            },
        },
        {
            $unwind: "$bookDetails",
        },
        {
            $project: {
                _id: 0,
                book: {
                    bookId: "$bookDetails._id",
                    title: "$bookDetails.title",
                    isbn: "$bookDetails.isbn",
                },
                totalQuantity: 1,
            },
        },
        { $skip: skip },
        { $limit: limit },
    ]);
    return {
        summary,
        totalCount,
    };
});
exports.BorrowService = {
    borrowBook,
    getBorrowedBooksSummary,
};
