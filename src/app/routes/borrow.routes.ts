import express from "express";
import { BorrowController } from "../controllers/borrow.controller";
import validateRequest from "../middlewares/validateRequest";
import { createBorrowValidationSchema } from "../validations/borrow.validation";

const router = express.Router();

// Borrow routes with validation
router.post(
  "/",
  validateRequest(createBorrowValidationSchema),
  BorrowController.borrowBook
);

router.get("/", BorrowController.getBorrowedBooksSummary);

export const borrowRoutes = router;
