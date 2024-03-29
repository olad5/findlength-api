import { Response, Request, NextFunction } from "express";
import { CustomAPIError } from "../error/custom-api";

const errorHandlerMiddleware = (
  err: CustomAPIError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let customError = {
    // set default
    statusCode: err.statusCode || 500,
    msg: err.message || "Something went wrong try again later",
  };

  // Video errors
  if (err.name === "Error" && err.message === "Video unavailable") {
    customError.msg = err.message;
    customError.statusCode = 404;
  }
  if (
    err.name === "Error" &&
    err.message ===
      "This is a private video. Please sign in to verify that you may see it."
  ) {
    customError.msg = err.message;
    customError.statusCode = 400;
  }

  // Playlists errors
  if (
    err.name === "Error" &&
    err.message === "invalid or unknown list query in url"
  ) {
    customError.msg = `not a known youtube link`;
    customError.statusCode = 404;
  }

  if (
    err.name === "Error" &&
    (err.message === "API-Error: The playlist does not exist." ||
      err.message === "Unknown Playlist")
  ) {
    customError.msg = "This playlist does not exist.";
    customError.statusCode = 404;
  }

  if (
    err.name === "Error" &&
    err.message.startsWith(`Unable to find a id in`)
  ) {
    customError.msg = "Invalid url";
    customError.statusCode = 403;
  }

  res.statusCode = customError.statusCode;
  return res.json({ status: false, message: customError.msg });
};

export default errorHandlerMiddleware;
