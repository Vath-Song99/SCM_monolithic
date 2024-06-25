import { logger } from "@scm/utils/logger";
import { NextFunction, Request, Response } from "express";
import { Schema, ZodError } from "zod";

/**
 * Middleware to validate request body against a Zod schema.
 * @param schema Zod schema object to validate request body.
 * @returns Express middleware function.
 */
export const zodValidator = (schema: Schema) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error: unknown) {
      if (error instanceof ZodError) {
        const errorMessages = error.errors.map((issue) => {
          return `${issue.path.join(".")} ${issue.message}`;
        });
        return res.status(422).json({ errors: errorMessages });
      }
      logger.error("Error in zodValidator middleware:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
};
