import appcontroller from '../controllers/appcontroller';
import RequestMiddleware from '../middlewares/requestMiddleware'
import express from 'express';
import debug from 'debug';

const log: debug.IDebugger = debug('app:users-controller');

export class AppRoutes {
    app: express.Application;

    constructor(app: express.Application) {
        this.app = app
        this.configureRoutes()
    }

    configureRoutes() {
        this.app
            .route(`/getVideoInfo`)
            .post(
                RequestMiddleware.validateVideoLink,
                appcontroller.getVideoInfo
            );
        this.app
            .route(`/getPlaylistInfo`)
            .post(
                RequestMiddleware.validatePlaylistLink,
                appcontroller.getPlaylistInfo
            );

        return this.app;
    }
}

