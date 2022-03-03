import express from 'express';
import ytdl from 'ytdl-core';
import ytpl from 'ytpl';
import debug from 'debug';
import {CustomAPIError} from '../error/custom-api';

const log: debug.IDebugger = debug('app:users-controller');

class RequestMiddleware {
    async validateVideoLink(
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ) {
        const isVideoValid: boolean = ytdl.validateURL(req.body.url)
        if (!isVideoValid) {
            throw new CustomAPIError('video link not valid', 403);
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
        log(playId);
        const isVideoValid: boolean = ytpl.validateID(playId)
        if (!isVideoValid) {
            return res.status(400).send({error: `video link not valid`});
        } else {
            next();
        }


    }


}

export default new RequestMiddleware();
