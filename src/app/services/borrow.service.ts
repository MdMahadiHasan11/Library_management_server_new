import {
  IBorrow,
  type IBorrowSummaryResult,
} from "../interfaces/borrow.interface";
import { Book } from "../models/book.model";
import { Borrow } from "../models/borrow.model";

// Borrow a book
const borrowBook = async (borrowData: IBorrow) => {
  // Start a session for transaction
  const session = await Borrow.startSession();

  try {
    session.startTransaction();

    // Check if book has enough copies
    const book = await Book.findById(borrowData.book);

    if (!book) {
      throw new Error("Book not found");
    }

    if (book.copies < borrowData.quantity) {
      throw new Error("Not enough copies available");
    }

    // Update book copies
    book.copies -= borrowData.quantity;
    await book.save({ session });

    // Update book availability if copies become 0
    if (book.copies === 0) {
      book.available = false;
      await book.save({ session });
    }

    // Create borrow record
    const result = await Borrow.create([borrowData], { session });

    await session.commitTransaction();
    session.endSession();

    return result[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    throw error;
  }
};

// Get borrowed books summary using aggregation
const getBorrowedBooksSummary = async (
  page: number = 1,
  limit: number = 10
): Promise<IBorrowSummaryResult> => {
  const skip = (page - 1) * limit;

  // Get total count first
  // const totalCount = await Borrow.countDocuments({ returned: false });
  const totalCount = (await Borrow.distinct("book")).length;

  // Get paginated summary
  const summary = await Borrow.aggregate([
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
};

export const BorrowService = {
  borrowBook,
  getBorrowedBooksSummary,
};
