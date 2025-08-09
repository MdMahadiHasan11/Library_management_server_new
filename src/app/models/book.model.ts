import { Schema, model } from "mongoose";
import { Genre, IBook } from "../interfaces/book.interface";
import { Borrow } from "./borrow.model";

const bookSchema = new Schema<IBook>(
  {
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
        values: Object.values(Genre),
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
        validator: function (value: number) {
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
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// Static method to check if a book has enough copies
bookSchema.statics.hasEnoughCopies = async function (
  bookId: string,
  quantity: number
) {
  const book = await this.findById(bookId);
  return book && book.copies >= quantity;
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
bookSchema.post("findOneAndDelete", async function (doc, next) {
  if (doc) {
    await Borrow.deleteMany({ book: doc._id });
    next();
  }
});

export const Book = model<IBook>("Book", bookSchema);
