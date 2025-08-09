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
exports.Book = void 0;
const mongoose_1 = require("mongoose");
const book_interface_1 = require("../interfaces/book.interface");
const borrow_model_1 = require("./borrow.model");
const bookSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, "Title is required"],
        trim: true,
    },
    author: {
        type: String,
        required: [true, "Author is required"],
        trim: true,
    },
    genre: {
        type: String,
        enum: {
            values: Object.values(book_interface_1.Genre),
            message: "{VALUE} is not a valid genre",
        },
        required: [true, "Genre is required"],
    },
    isbn: {
        type: String,
        required: [true, "ISBN is required"],
        unique: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    copies: {
        type: Number,
        required: [true, "Number of copies is required"],
        min: [0, "Copies must be a positive number"],
        validate: {
            validator: function (value) {
                return Number.isInteger(value) && value >= 0;
            },
            message: "Copies must be a non-negative integer",
        },
    },
    available: {
        type: Boolean,
        default: true,
    },
    image: {
        type: String,
    },
    publishedYear: {
        type: Number,
    },
}, {
    timestamps: true,
    versionKey: false,
});
// Static method to check if a book has enough copies
bookSchema.statics.hasEnoughCopies = function (bookId, quantity) {
    return __awaiter(this, void 0, void 0, function* () {
        const book = yield this.findById(bookId);
        return book && book.copies >= quantity;
    });
};
// Instance method to update availability based on copies
bookSchema.methods.updateAvailability = function () {
    this.available = this.copies > 0;
    return this.save();
};
// Middleware: Pre-save hook to set availability based on copies
bookSchema.pre("save", function (next) {
    this.available = this.copies > 0;
    next();
});
// Query Middleware: Post delete hok to remove data from borrow data 
bookSchema.post("findOneAndDelete", function (doc, next) {
    return __awaiter(this, void 0, void 0, function* () {
        if (doc) {
            yield borrow_model_1.Borrow.deleteMany({ book: doc._id });
            next();
        }
    });
});
exports.Book = (0, mongoose_1.model)("Book", bookSchema);
