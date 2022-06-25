import express from "express";
import ytdl from "ytdl-core";
import ytpl from "ytpl";
import { CustomAPIError } from "../error/custom-api";

class RequestMiddleware {
  async validateVideoLink(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const isVideoValid: boolean = ytdl.validateURL(req.body.url);
    if (!isVideoValid) {
      throw new CustomAPIError("video link not valid", 400);
    } else {
      next();
    }
  }

  async validatePlaylistLink(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const playId: string = await ytpl.getPlaylistID(req.body.url);
    const isVideoValid: boolean = ytpl.validateID(playId);
    if (!isVideoValid) {
      throw new CustomAPIError("playlist link not valid", 400);
    } else {
      next();
    }
  }
}

export default new RequestMiddleware();
