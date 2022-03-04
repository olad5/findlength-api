import Ytdl from '../services/ytdlOps'
import express from 'express';
import debug from 'debug';
import {getResourceSpeed} from '../utils/timeComputation';

const log: debug.IDebugger = debug('app:users-controller');

class AppController {
    /**
     * Gets the speed of a single video at 1.25x, 1.5x, 1.75x, 2x speeds
     */
    async getVideoInfo(req: express.Request, res: express.Response) {
        const videoInfo = await Ytdl.getVideoInfo(req.body.url)// this works for single videos
        const lengthSeconds: number = Number(videoInfo.videoDetails.lengthSeconds);
        const data: string[] = getResourceSpeed(lengthSeconds)
        return res.status(200).json({status: true, message: "Video speeds computed", videoSpeeds: data});
    }

    /**
     * Gets the speed of a playlist at 1.25x, 1.5x, 1.75x, 2x speeds
     */
    async getPlaylistInfo(req: express.Request, res: express.Response) {
        const playlistInfo = await Ytdl.getPlaylistInfo(req.body.url)
        let totalSeconds: number = 0
        // gets the total seconds for the playlist at normal speed
        for (let i: number = 0; i < playlistInfo.estimatedItemCount; i++) {
            let durationInSeconds: number | null = playlistInfo.items[i].durationSec
            if (durationInSeconds) {
                totalSeconds += durationInSeconds
            }
        }
        const data: string[] = getResourceSpeed(totalSeconds)
        return res.status(200).json({status: true, message: "Playlist Info", playlistInfo: data});
    }
}

export default new AppController();
