"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const book_routes_1 = require("./book.routes");
const borrow_routes_1 = require("./borrow.routes");
const router = express_1.default.Router();
const routes = [
    {
        path: "/books",
        route: book_routes_1.bookRoutes,
    },
    {
        path: "/borrow",
        route: borrow_routes_1.borrowRoutes,
    },
];
routes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
