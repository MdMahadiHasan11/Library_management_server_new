"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const zod_1 = require("zod");
const globalErrorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Something went wrong!";
    let errorResponse = {
        message: err.message,
        name: err.name,
    };
    // Handle Zod Validation Error - Same structure as Mongoose
    if (err instanceof zod_1.ZodError) {
        statusCode = 400;
        message = "Validation failed";
        errorResponse = {
            name: "ValidationError",
            errors: {},
        };
        err.issues.forEach((issue) => {
            // Remove 'body.' prefix to match expected format
            const path = issue.path.length > 1 && issue.path[0] === "body"
                ? issue.path.slice(1).join(".")
                : issue.path.join(".");
            // Get actual value from request object with proper type handling
            let actualValue = null;
            try {
                if (issue.path[0] === "body" && req.body && issue.path.length > 1) {
                    const fieldPath = issue.path.slice(1);
                    actualValue = fieldPath.reduce((obj, key) => {
                        return obj && typeof obj === 'object' ? obj[key] : undefined;
                    }, req.body);
                }
                else if (issue.path[0] === "query" && req.query && issue.path.length > 1) {
                    const fieldPath = issue.path.slice(1);
                    actualValue = fieldPath.reduce((obj, key) => {
                        return obj && typeof obj === 'object' ? obj[key] : undefined;
                    }, req.query);
                }
                else if (issue.path[0] === "params" && req.params && issue.path.length > 1) {
                    const fieldPath = issue.path.slice(1);
                    actualValue = fieldPath.reduce((obj, key) => {
                        return obj && typeof obj === 'object' ? obj[key] : undefined;
                    }, req.params);
                }
            }
            catch (e) {
                actualValue = null;
            }
            // If actualValue is undefined, set it to null for consistency
            if (actualValue === undefined) {
                actualValue = null;
            }
            errorResponse.errors[path] = {
                message: issue.message,
                name: "ValidatorError",
                properties: Object.assign(Object.assign({ message: issue.message, type: issue.code === "too_small" ? "min" : issue.code }, (issue.code === "too_small" && { min: issue.minimum })), (issue.code === "too_big" && { max: issue.maximum })),
                kind: issue.code === "too_small" ? "min" : issue.code,
                path: path,
                value: actualValue,
            };
        });
    }
    // Handle Mongoose Validation Error
    else if (err instanceof mongoose_1.Error.ValidationError) {
        statusCode = 400;
        message = "Validation failed";
        errorResponse = {
            name: "ValidationError",
            errors: {},
        };
        Object.keys(err.errors).forEach((key) => {
            var _a, _b;
            const error = err.errors[key];
            errorResponse.errors[key] = {
                message: error.message,
                name: error.name,
                properties: Object.assign(Object.assign({ message: error.message, type: error.kind }, (error.kind === "min" && { min: (_a = error.properties) === null || _a === void 0 ? void 0 : _a.min })), (error.kind === "max" && { max: (_b = error.properties) === null || _b === void 0 ? void 0 : _b.max })),
                kind: error.kind,
                path: error.path,
                value: error.value,
            };
        });
    }
    // Handle Mongoose Cast Error (Invalid ObjectId)
    else if (err.name === "CastError") {
        statusCode = 400;
        message = "Invalid ID format";
        errorResponse = {
            name: "CastError",
            message: `Invalid ${err.path}: ${err.value}`,
        };
    }
    // Handle Mongoose Duplicate Key Error
    else if (err.code === 11000) {
        statusCode = 400;
        message = "Duplicate field value";
        const field = Object.keys(err.keyValue)[0];
        errorResponse = {
            name: "MongoServerError",
            message: `${field} already exists`,
            code: 11000,
        };
    }
    res.status(statusCode).json({
        message,
        success: false,
        error: errorResponse,
    });
};
exports.default = globalErrorHandler;
