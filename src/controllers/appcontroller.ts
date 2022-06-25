import Ytdl from "../services/ytdlOps";
import express from "express";
import {
  formatResourceSpeeds,
  computeResourceSpeed,
} from "../utils/timeComputation";

class AppController {
  /**
   * Gets the speed of a single video at 1.25x, 1.5x, 1.75x, 2x speeds
   */
  async getVideoInfo(req: express.Request, res: express.Response) {
    const videoInfo = await Ytdl.getVideoInfo(req.body.url); // this works for single videos
    const videoTitle = videoInfo.videoDetails?.title;
    const lengthSeconds = videoInfo.videoDetails?.lengthSeconds;

    const data = formatResourceSpeeds(Number(lengthSeconds));

    const originalLength = computeResourceSpeed(Number(lengthSeconds), 1);

    res.statusCode = 200;
    return res.json({
      status: true,
      message: "Video speeds computed",
      resourceTitle: videoTitle,
      originalLength: originalLength,
      speeds: data,
    });
  }

  /**
   * Gets the speed of a playlist at 1.25x, 1.5x, 1.75x, 2x speeds
   */
  async getPlaylistInfo(req: express.Request, res: express.Response) {
    const playlistInfo = await Ytdl.getPlaylistInfo(req.body.url);
    const playlistTitle = playlistInfo.title;
    let totalSeconds: number = 0;

    for (let i: number = 0; i < playlistInfo.items?.length; i++) {
      let durationInSeconds: number | null = playlistInfo.items[i].durationSec;
      if (durationInSeconds) {
        totalSeconds += durationInSeconds;
      }
    }

    const originalLength = computeResourceSpeed(totalSeconds, 1);
    const data = formatResourceSpeeds(totalSeconds);
    res.statusCode = 200;
    return res.json({
      status: true,
      message: "Playlist speeds computed",
      resourceTitle: playlistTitle,
      originalLength: originalLength,
      speeds: data,
    });
  }
}

export default new AppController();
