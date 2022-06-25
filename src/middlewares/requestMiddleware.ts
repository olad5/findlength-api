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
    // TODO:make a new middleware that checks if the text field is empty,
    // this wont just throw an error.
    // You need this because it's meant to be added to both the video
    // and the playlist routes

    // if (!req.body.url) {
    //   console.log("no  datta in the url object");
    //   throw new CustomAPIError("video link not valid", 400);
    // }
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
