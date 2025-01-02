import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";

export const ValidateRequest = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      /*
      if (schema.params) {
        req.params = await schema.params.parse(req.params);
      }
      if (schema.body) {
        req.body = await schema.body.parse(req.body);
      }
      if (schema.query) {
        req.query = await schema.query.parse(req.query);
      }
      */
      schema.parse({
        params: req.params,
        query: req.query,
        body: req.body,
      });
      return next();
    } catch (error: any) {
      return res.status(400).send(error.errors);
    }
  };
};
