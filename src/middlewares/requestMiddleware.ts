import express from 'express';
import ytdl from 'ytdl-core';
import ytpl from 'ytpl';
import debug from 'debug';

const log: debug.IDebugger = debug('app:users-controller');

class RequestMiddleware {
    async validateVideoLink(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const isVideoValid: boolean = ytdl.validateURL(req.body.url)
        if (!isVideoValid) {
            res.status(400).send({error: `video link not valid`});
        } else {
            next();
        }
    }

    async validatePlaylistLink(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const playId: string = await ytpl.getPlaylistID(req.body.url)
        const isVideoValid: boolean = ytpl.validateID(playId)
        if (!isVideoValid) {
            return res.status(400).send({error: `video link not valid`});
        } else {
            next();
        }

    }


}

export default new RequestMiddleware();
