import Ytdl from "../services/ytdlOps";
import express from "express";
import debug from "debug";
import {
  formatResourceSpeeds,
  computeResourceSpeed,
} from "../utils/timeComputation";

const log: debug.IDebugger = debug("app:users-controller");

class AppController {
  /**
   * Gets the speed of a single video at 1.25x, 1.5x, 1.75x, 2x speeds
   */
  async getVideoInfo(req: express.Request, res: express.Response) {
    const videoInfo = await Ytdl.getVideoInfo(req.body.url); // this works for single videos
    const lengthSeconds: number = Number(videoInfo.videoDetails.lengthSeconds);

    const data = formatResourceSpeeds(lengthSeconds);

    const originalLength = computeResourceSpeed(lengthSeconds, 1);
    return res.status(200).json({
      status: true,
      message: "Video speeds computed",
      originalLength: originalLength,
      speeds: data,
    });
  }

  /**
   * Gets the speed of a playlist at 1.25x, 1.5x, 1.75x, 2x speeds
   */
  async getPlaylistInfo(req: express.Request, res: express.Response) {
    const playlistInfo = await Ytdl.getPlaylistInfo(req.body.url);
    let totalSeconds: number = 0;

    for (let i: number = 0; i < playlistInfo.items.length; i++) {
      let durationInSeconds: number | null = playlistInfo.items[i].durationSec;
      if (durationInSeconds) {
        totalSeconds += durationInSeconds;
      }
    }

    const originalLength = computeResourceSpeed(totalSeconds, 1);
    const data = formatResourceSpeeds(totalSeconds);
    return res.status(200).json({
      status: true,
      message: "Playlist speeds computed",
      originalLength: originalLength,
      speeds: data,
    });
  }
}

export default new AppController();
