import Ytdl from '../services/ytdlOps'
import express from 'express';
import debug from 'debug';
import {getVideoSpeeds} from '../utils/timeComputation';

const log: debug.IDebugger = debug('app:users-controller');

class AppController {
    /**
     * Gets the speeds of a single video at 1.25x, 1.5x, 1.75x, 2x speeds
     */
    async getVideoInfo(req: express.Request, res: express.Response) {
        let videoInfo = await Ytdl.getVideoInfo(req.body.url)// this works for single videos
        let lengthSeconds: number = Number(videoInfo.videoDetails.lengthSeconds);

        const data: string[] = getVideoSpeeds(lengthSeconds)

        return res.status(200).json({status: true, message: "Video speeds computed", videoSpeeds: data});

    }

    async getPlaylistInfo(req: express.Request, res: express.Response) {
        let playlistInfo = await Ytdl.getPlaylistInfo(req.body.url)
        return res.status(200).json({status: true, message: "Playlist Info", playlistInfo: playlistInfo});

    }
}

export default new AppController();
