import {Response, Request, NextFunction} from "express";
import {CustomAPIError} from "../error/custom-api";
import debug from "debug";

const log: debug.IDebugger = debug('app:errorHandlerMiddleware');

const errorHandlerMiddleware = (err: CustomAPIError, req: Request, res: Response, next: NextFunction) => {
    log(err.name);
    console.log(err);
    let customError = {
        // set default
        statusCode: err.statusCode || 500,
        msg: err.message || 'Something went wrong try again later',
    };


    // Video errors
    if (err.name === 'Error' && err.message === "Video unavailable") {
        customError.msg = err.message
        customError.statusCode = 404;
    }

    // Playlists errors
    if (err.name === 'Error' && err.message === 'invalid or unknown list query in url') {
        customError.msg = `not a known youtube link`;
        customError.statusCode = 404;
    }

    if (err.name === 'Error' && err.message === "API-Error: The playlist does not exist.") {
        customError.msg = "This playlist does not exist.";
        customError.statusCode = 404;
    }
    if (err.name === 'Error' && err.message === "API-Error: The playlist does not exist.") {
        customError.msg = "This playlist does not exist.";
        customError.statusCode = 404;
    }

    if (err.name === 'Error' && err.message.startsWith(`Unable to find a id in`)) {
        customError.msg = "Invalid url";
        customError.statusCode = 403;
    }



    return res.status(customError.statusCode).json({status: false, message: customError.msg});
};

export default errorHandlerMiddleware;
