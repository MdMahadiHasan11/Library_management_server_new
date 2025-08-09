import { Request, Response, NextFunction } from 'express';
import { BookService } from '../services/book.service';

// Create a new book
const createBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const result = await BookService.createBook(req.body);
    
    res.status(201).json({
      success: true,
      message: 'Book created successfully',
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

// Get all books with pagination

const getAllBooks = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { 
      filter="", 
      sortBy = 'createdAt', 
      sort = 'desc', 
      limit = 10, 
      page = 1 
    } = req.query;

    const result = await BookService.getAllBooks(
      filter as string,
      sortBy as string,
      sort as string,
      Number(limit),
      Number(page)
    );

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
  } catch (error) {
    next(error);
  }
};

export default { getAllBooks };

// Get a book by ID
const getBookById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId } = req.params;
    const result = await BookService.getBookById(bookId);
    
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
  } catch (error) {
    next(error);
  }
};

// Update a book
const updateBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId } = req.params;
    const result = await BookService.updateBook(bookId, req.body);
    
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
  } catch (error) {
    next(error);
  }
};

// Delete a book
const deleteBook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { bookId } = req.params;
    const result = await BookService.deleteBook(bookId);
    
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
  } catch (error) {
    next(error);
  }
};

export const BookController = {
  createBook,
  getAllBooks,
  getBookById,
  updateBook,
  deleteBook,
};