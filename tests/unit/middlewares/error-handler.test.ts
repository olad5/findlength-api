import { NextFunction, Request, Response } from "express";
import { CustomAPIError } from "../../../src/error/custom-api";
import errorHanldlerMiddleware from "../../../src/middlewares/error-handler";

let expectedResponse = {
  status: false,
  message: "",
};

beforeAll(() => {
  jest.clearAllMocks();
});

describe("Unit test for Error handler Middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();
  let err: CustomAPIError;

  beforeEach(() => {
    mockRequest = {};
    mockResponse = {
      json: jest.fn(),
    };
  });
  it("should return a 404 and a 'Video unavailable' message ", () => {
    expectedResponse.message = "Video unavailable";

    err = new CustomAPIError("Video unavailable", 404);
    errorHanldlerMiddleware(
      err,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.statusCode).toBe(404);
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(nextFunction).toHaveBeenCalledTimes(0);
  });

  it("should return a 404 and a 'not a known youtube link' message ", () => {
    expectedResponse.message = "not a known youtube link";

    err = new CustomAPIError("invalid or unknown list query in url", 404);
    errorHanldlerMiddleware(
      err,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.statusCode).toBe(404);
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(nextFunction).toHaveBeenCalledTimes(0);
  });
  it("should return a 404 and a 'This playlist does not exist.' message ", () => {
    expectedResponse.message = "This playlist does not exist.";

    err = new CustomAPIError("API-Error: The playlist does not exist.", 404);
    errorHanldlerMiddleware(
      err,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.statusCode).toBe(404);
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(nextFunction).toHaveBeenCalledTimes(0);
  });
  it("should return a 403 and a 'Invalid url' message ", () => {
    expectedResponse.message = "Invalid url";

    err = new CustomAPIError("Unable to find a id in resource", 403);
    errorHanldlerMiddleware(
      err,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.statusCode).toBe(403);
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(nextFunction).toHaveBeenCalledTimes(0);
  });
  it("should return a 500 and a 'Something went wrong try again later' message ", () => {
    expectedResponse.message = "Something went wrong try again later";
    err = new CustomAPIError("", 0);

    errorHanldlerMiddleware(
      err,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.statusCode).toBe(500);
    expect(mockResponse.json).toBeCalledWith(expectedResponse);
    expect(nextFunction).toHaveBeenCalledTimes(0);
  });
});
