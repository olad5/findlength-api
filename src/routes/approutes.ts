import appcontroller from "../controllers/appcontroller";
import RequestMiddleware from "../middlewares/requestMiddleware";
import CheckRequestFieldMiddleware from "../middlewares/checkRequestField";
import express from "express";

export class AppRoutes {
  app: express.Application;

  constructor(app: express.Application) {
    this.app = app;
    this.configureRoutes();
  }

  configureRoutes() {
    this.app
      .route(`/getVideoInfo`)
      .post(
        CheckRequestFieldMiddleware.validateRequestField,
        RequestMiddleware.validateVideoLink,
        appcontroller.getVideoInfo
      );
    this.app
      .route(`/getPlaylistInfo`)
      .post(
        CheckRequestFieldMiddleware.validateRequestField,
        RequestMiddleware.validatePlaylistLink,
        appcontroller.getPlaylistInfo
      );

    return this.app;
  }
}
