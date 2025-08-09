import express from "express";
import { BookController } from "../controllers/book.controller";
import validateRequest from "../middlewares/validateRequest";
import {
  createBookValidationSchema,
  updateBookValidationSchema,
  bookIdValidationSchema,
} from "../validations/book.validation";
import { bookQueryValidationSchema } from "../validations/query.validation";

const router = express.Router();

// Book routes with validation
router.post(
  "/",
  validateRequest(createBookValidationSchema),
  BookController.createBook
);

router.get(
  "/",
  validateRequest(bookQueryValidationSchema),
  BookController.getAllBooks
);

router.get(
  "/:bookId",
  validateRequest(bookIdValidationSchema),
  BookController.getBookById
);

router.put(
  "/:bookId",
  validateRequest(bookIdValidationSchema),
  validateRequest(updateBookValidationSchema),
  BookController.updateBook
);

router.delete(
  "/:bookId",
  validateRequest(bookIdValidationSchema),
  BookController.deleteBook
);

export const bookRoutes = router;
