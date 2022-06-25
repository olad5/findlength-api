import express from "express";
import "express-async-errors"; // package to catch async errors
import bodyParser from "body-parser";
import cors from "cors";
import process from "process";
import * as expressWinston from "express-winston";
import errorHandlerMiddleware from "./middlewares/error-handler";
import loggerOptions from "./utils/logger";
import { AppRoutes } from "./routes/approutes";

const app: express.Application = express();
// const debugLog: debug.IDebugger = debug("app");

app.use(bodyParser.json({ limit: "31mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors()); // Implement CORS

if (!process.env.DEBUG) {
  loggerOptions.meta = true; // when not debugging, make true
}

app.use(expressWinston.logger(loggerOptions));

// const routes: AppRoutes[] = [new AppRoutes(app)]; // add the routes
new AppRoutes(app); // add the routes

app.use(errorHandlerMiddleware);

export default app;
