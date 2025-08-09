import { Request, Response, NextFunction } from "express";
import { Error as MongooseError } from "mongoose";
import { ZodError } from "zod";

interface CustomError extends Error {
  statusCode?: number;
  status?: string;
  isOperational?: boolean;
}

const globalErrorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || "Something went wrong!";
  let errorResponse: any = {
    message: err.message,
    name: err.name,
  };

  // Handle Zod Validation Error - Same structure as Mongoose
  if (err instanceof ZodError) {
    statusCode = 400;
    message = "Validation failed";
    errorResponse = {
      name: "ValidationError",
      errors: {},
    };

    err.issues.forEach((issue) => {
      // Remove 'body.' prefix to match expected format
      const path =
        issue.path.length > 1 && issue.path[0] === "body"
          ? issue.path.slice(1).join(".")
          : issue.path.join(".");

      // Get actual value from request object with proper type handling
      let actualValue: any = null;
      try {
        if (issue.path[0] === "body" && req.body && issue.path.length > 1) {
          const fieldPath = issue.path.slice(1) as string[];
          actualValue = fieldPath.reduce((obj: any, key: string) => {
            return obj && typeof obj === 'object' ? obj[key] : undefined;
          }, req.body);
        } else if (issue.path[0] === "query" && req.query && issue.path.length > 1) {
          const fieldPath = issue.path.slice(1) as string[];
          actualValue = fieldPath.reduce((obj: any, key: string) => {
            return obj && typeof obj === 'object' ? obj[key] : undefined;
          }, req.query);
        } else if (issue.path[0] === "params" && req.params && issue.path.length > 1) {
          const fieldPath = issue.path.slice(1) as string[];
          actualValue = fieldPath.reduce((obj: any, key: string) => {
            return obj && typeof obj === 'object' ? obj[key] : undefined;
          }, req.params);
        }
      } catch (e) {
        actualValue = null;
      }

      // If actualValue is undefined, set it to null for consistency
      if (actualValue === undefined) {
        actualValue = null;
      }

      errorResponse.errors[path] = {
        message: issue.message,
        name: "ValidatorError",
        properties: {
          message: issue.message,
          type: issue.code === "too_small" ? "min" : issue.code,
          ...(issue.code === "too_small" && { min: (issue as any).minimum }),
          ...(issue.code === "too_big" && { max: (issue as any).maximum }),
        },
        kind: issue.code === "too_small" ? "min" : issue.code,
        path: path,
        value: actualValue,
      };
    });
  }

  // Handle Mongoose Validation Error
  else if (err instanceof MongooseError.ValidationError) {
    statusCode = 400;
    message = "Validation failed";
    errorResponse = {
      name: "ValidationError",
      errors: {},
    };

    Object.keys(err.errors).forEach((key) => {
      const error = err.errors[key];
      errorResponse.errors[key] = {
        message: error.message,
        name: error.name,
        properties: {
          message: error.message,
          type: error.kind,
          ...(error.kind === "min" && { min: (error as any).properties?.min }),
          ...(error.kind === "max" && { max: (error as any).properties?.max }),
        },
        kind: error.kind,
        path: error.path,
        value: (error as any).value,
      };
    });
  }

  // Handle Mongoose Cast Error (Invalid ObjectId)
  else if (err.name === "CastError") {
    statusCode = 400;
    message = "Invalid ID format";
    errorResponse = {
      name: "CastError",
      message: `Invalid ${(err as any).path}: ${(err as any).value}`,
    };
  }

  // Handle Mongoose Duplicate Key Error
  else if ((err as any).code === 11000) {
    statusCode = 400;
    message = "Duplicate field value";
    const field = Object.keys((err as any).keyValue)[0];
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

export default globalErrorHandler;
