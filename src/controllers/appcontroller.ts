import Ytdl from '../services/ytdlOps'
import express from 'express';
import debug from 'debug';

const log: debug.IDebugger = debug('app:users-controller');

class AppController {
    async getVideoInfo(req: express.Request, res: express.Response) {
        let videoInfo = await Ytdl.getVideoInfo(req.body.url)// this works for single videos
        return res.status(200).json({status: true, message: "Video Info", videoInfo: videoInfo});

        // res.status(200).send(videoInfo);
    }
    async getPlaylistInfo(req: express.Request, res: express.Response) {
        let playlistInfo = await Ytdl.getPlaylistInfo(req.body.url)// this works for single videos
        // res.status(200).send(playlistInfo);
        return res.status(200).json({status: true, message: "Playlist Info", playlistInfo: playlistInfo});

    }
}

export default new AppController();

