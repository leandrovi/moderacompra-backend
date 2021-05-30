import { Request, Response, NextFunction } from "express";
import { object, string } from "yup";
import { ObjectShape, OptionalObjectSchema } from "yup/lib/object";

export function validate(schema: OptionalObjectSchema<ObjectShape>) {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const newSchema =
        req.method === "POST"
          ? schema
          : schema.concat(object({ id: string().required() }));

      req.body = await newSchema.validate(req.body, {
        abortEarly: false,
        stripUnknown: false,
      });

      next();
    } catch (err) {
      console.log(err);
      res.status(400).json({ errorMessage: err.message });
    }
  };
}
