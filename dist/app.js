"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = __importDefault(require("./app/routes"));
const globalErrorHandler_1 = __importDefault(require("./app/middlewares/globalErrorHandler"));
const app = (0, express_1.default)();
// Middlewares
app.use(express_1.default.json());
app.use((0, cors_1.default)({
    origin: [
        "http://localhost:5173",
        "https://library-management-minimal-web.vercel.app",
    ],
}));
app.use("/api", routes_1.default);
// Default route
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to Library Management API",
    });
});
// Global error handling middleware
app.use(globalErrorHandler_1.default);
// Not found route
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found",
    });
});
exports.default = app;
