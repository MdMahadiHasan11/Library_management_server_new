"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookRoutes = void 0;
const express_1 = __importDefault(require("express"));
const book_controller_1 = require("../controllers/book.controller");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const book_validation_1 = require("../validations/book.validation");
const query_validation_1 = require("../validations/query.validation");
const router = express_1.default.Router();
// Book routes with validation
router.post("/", (0, validateRequest_1.default)(book_validation_1.createBookValidationSchema), book_controller_1.BookController.createBook);
router.get("/", (0, validateRequest_1.default)(query_validation_1.bookQueryValidationSchema), book_controller_1.BookController.getAllBooks);
router.get("/:bookId", (0, validateRequest_1.default)(book_validation_1.bookIdValidationSchema), book_controller_1.BookController.getBookById);
router.put("/:bookId", (0, validateRequest_1.default)(book_validation_1.bookIdValidationSchema), (0, validateRequest_1.default)(book_validation_1.updateBookValidationSchema), book_controller_1.BookController.updateBook);
router.delete("/:bookId", (0, validateRequest_1.default)(book_validation_1.bookIdValidationSchema), book_controller_1.BookController.deleteBook);
exports.bookRoutes = router;
