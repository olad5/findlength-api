import appcontroller from "../controllers/appcontroller";
import RequestMiddleware from "../middlewares/requestMiddleware";
import CheckRequestFieldMiddleware from "../middlewares/checkRequestField";
import express from "express";
import debug from "debug";

const log: debug.IDebugger = debug("app:users-controller");

// TODO: test this using supertest

export class AppRoutes {
  app: express.Application;

  constructor(app: express.Application) {
    this.app = app;
    this.configureRoutes();
  }

  // TODO:i think this is an integration test, since you have multiple connections
  // and you dont need to mock them since you have control over them

  // TODO: I need to get access the app, supertest needs it
  // TODO:might have to export the app in the app.ts file

  // //   TODO:the first thing first is to refactor that app stuff and makes
  //   sure it works

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
