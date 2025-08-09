import { IBook, type IBookQueryResult } from "../interfaces/book.interface";
import { Book } from "../models/book.model";

// Create a new book
const createBook = async (bookData: IBook) => {
  const result = await Book.create(bookData);
  return result;
};

// Get all books with filtering, sorting and pagination
const getAllBooks = async (
  filter?: string,
  sortBy: string = "createdAt",
  sort: string = "desc",
  limit: number = 10,
  page: number = 1
): Promise<IBookQueryResult> => {
  const query: any = {};

  if (filter) {
    query.genre = filter;
  }

  const sortOptions: Record<string, 1 | -1> = {};
  sortOptions[sortBy] = sort === "desc" ? -1 : 1;

  const skip = (page - 1) * limit;
  const totalCount = await Book.countDocuments(query);

  const books = await Book.find(query)
    .sort(sortOptions)
    .skip(skip)
    .limit(limit)
    .lean();

  return {
    books,
    totalCount,
  };
};

// Get a book by ID
const getBookById = async (id: string) => {
  const result = await Book.findById(id);
  return result;
};

// Update a book
const updateBook = async (id: string, payload: Partial<IBook>) => {
  const result = await Book.findByIdAndUpdate(id, payload, {
    new: true,
    runValidators: true,
  });
  return result;
};

// Delete a book
const deleteBook = async (id: string) => {
  const result = await Book.findOneAndDelete({_id:new Object(id) });
  return result;
};

export const BookService = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};
