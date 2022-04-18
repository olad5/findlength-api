import express from "express";
import "express-async-errors"; // package to catch async errors
import bodyParser from "body-parser";
import cors from "cors";
import debug from "debug";
import process from "process";
import * as winston from "winston";
import * as expressWinston from "express-winston";
import errorHandlerMiddleware from "./middlewares/error-handler";

import { AppRoutes } from "./routes/approutes";
const app: express.Application = express();
const debugLog: debug.IDebugger = debug("app");

app.use(bodyParser.json({ limit: "31mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); // Implement CORS

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  ),
};

if (!process.env.DEBUG) {
  loggerOptions.meta = true; // when not debugging, make true
}

app.use(expressWinston.logger(loggerOptions));

const routes: AppRoutes[] = [new AppRoutes(app)]; // add the routes

app.use(errorHandlerMiddleware);

process.on("uncaughtException", (err) => {
  // uncaught exceptions are meant to stop the server
  console.log("UNCAUGHT EXCEPTION! 💥 Shutting down...");
  console.log(err.name, err.message);
  process.exit(1);
});

const port = process.env.PORT || 5200;
const server = app.listen(port, () => {
  console.log(`Server Running on Port: http://localhost:${port}\n`);
});

process.on(
  "unhandledRejection",
  (reason: unknown, promise: Promise<unknown>) => {
    console.log("UNHANDLED REJECTION! 💥 Shutting down...");
    console.log(reason, promise);
    server.close(() => {
      process.exit(1);
    });
  }
);

process.on("SIGTERM", () => {
  console.log("👋 SIGTERM RECEIVED. Shutting down gracefully");
  server.close(() => {
    console.log("💥 Process terminated!");
  });
});
