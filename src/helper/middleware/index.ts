import { Request, Response, NextFunction } from "express";
import { Schema } from "joi"; // Assuming you're using Joi for validation

const middleware = (schema: Schema, property: keyof Request) => {
  if (!schema) {
    throw new Error("Schema is required");
  }

  return (req: Request, res: Response, next: NextFunction) => {
    const { error } = schema.validate(req[property]);

    if (!error) {
      return next();
    }

    const { details } = error;
    const message = details.map((i) => i.message).join(",");

    console.error("Validation error:", message);
    res.status(400).json({ error: message });
  };
};

export default middleware;
