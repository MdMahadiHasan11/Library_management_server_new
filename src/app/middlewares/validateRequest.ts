import { Request, Response, NextFunction } from "express";
import { ZodObject } from "zod";

const validateRequest = (schema: ZodObject<any>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (error) {
      // Pass the error to global error handler instead of handling here
      next(error);
    }
  };
};

export default validateRequest;
