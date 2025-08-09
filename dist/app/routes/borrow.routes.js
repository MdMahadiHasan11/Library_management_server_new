"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.borrowRoutes = void 0;
const express_1 = __importDefault(require("express"));
const borrow_controller_1 = require("../controllers/borrow.controller");
const validateRequest_1 = __importDefault(require("../middlewares/validateRequest"));
const borrow_validation_1 = require("../validations/borrow.validation");
const router = express_1.default.Router();
// Borrow routes with validation
router.post("/", (0, validateRequest_1.default)(borrow_validation_1.createBorrowValidationSchema), borrow_controller_1.BorrowController.borrowBook);
router.get("/", borrow_controller_1.BorrowController.getBorrowedBooksSummary);
exports.borrowRoutes = router;
