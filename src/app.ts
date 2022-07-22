import express from "express";
import "express-async-errors"; // package to catch async errors
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import rateLimiter from "express-rate-limit";
import compression from "compression";

import process from "process";
import * as expressWinston from "express-winston";
import errorHandlerMiddleware from "./middlewares/error-handler";
import loggerOptions from "./utils/logger";
import { AppRoutes } from "./routes/approutes";

const app: express.Application = express();

app.use(
  rateLimiter({
    windowMs: 15 * 60 * 1000,
    max: 60,
  })
);

app.use(bodyParser.json({ limit: "31mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(helmet());
app.use(cors());

if (!process.env.DEBUG) {
  loggerOptions.meta = true; // when not debugging, make true
}

app.use(compression());

app.use(expressWinston.logger(loggerOptions));

new AppRoutes(app); // add the routes

app.use(errorHandlerMiddleware);

export default app;
