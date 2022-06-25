import express from "express";
import { CustomAPIError } from "../error/custom-api";

class CheckRequestFieldMiddleware {
  async validateRequestField(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (!req.body.url) {
      throw new CustomAPIError("url field cannot be empty", 400);
    } else {
      next();
    }
  }
}

export default new CheckRequestFieldMiddleware();
