import { NextFunction, Request, Response } from "express";
import ShopSchema from "../schemas/ShopSchema";

export const createShop = (req: Request, res: Response, next: NextFunction) => {
  const { error } = ShopSchema.validate(req.body);
  if (error) {
    return next(error);
  }
};
