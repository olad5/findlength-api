import { NextFunction, Request, Response } from "express";
import RequestMiddleware from "../../../src/middlewares/requestMiddleware";
import ytdl from "ytdl-core";
import ytpl from "ytpl";
import { CustomAPIError } from "../../../src/error/custom-api";

beforeAll(() => {
  jest.clearAllMocks();
});

jest.mock("ytdl-core");
jest.mock("ytpl");
describe("Unit test for Request Middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {
      body: {
        url: "",
      },
    };
    mockResponse = {
      json: jest.fn(),
      status: jest.fn(),
    };
  });
  describe("Test for validateVIdeoLink", () => {
    it("should throw an error and have a statusCode of 400 if the video link is invalid", async () => {
      const mockfunc = (ytdl.validateURL as jest.Mock).mockReturnValueOnce(
        false
      );
      let testState = false;
      try {
        await RequestMiddleware.validateVideoLink(
          mockRequest as Request,
          mockResponse as Response,
          nextFunction
        );
      } catch (e: unknown) {
        expect(e instanceof Error).toBe(true);
        if (e instanceof CustomAPIError) {
          expect(e.statusCode).toBe(400);
          testState = true;
        }
      }
      expect(mockfunc).toHaveBeenCalled();
      expect(nextFunction).toHaveBeenCalledTimes(0);
      expect(testState).toBe(true);
    });

    it("should call the next function if the video link is valid", async () => {
      const mockfunc = (ytdl.validateURL as jest.Mock).mockReturnValueOnce(
        true
      );
      try {
        await RequestMiddleware.validateVideoLink(
          mockRequest as Request,
          mockResponse as Response,
          nextFunction
        );
      } catch (e: unknown) {}
      expect(mockfunc).toHaveBeenCalled();
      expect(nextFunction).toHaveBeenCalledTimes(1);
    });
  });
  describe("Test for validatePlaylistLink", () => {
    it("should through an error and have a statusCode of 400 if the playlist link is invalid", async () => {
      const getPlaylistIDmockFunction = (
        ytpl.getPlaylistID as jest.Mock
      ).mockReturnValueOnce(expect.any(String));

      const validateIDmockFunction = (
        ytpl.validateID as jest.Mock
      ).mockReturnValueOnce(false);

      let testState = false;

      try {
        await RequestMiddleware.validatePlaylistLink(
          mockRequest as Request,
          mockResponse as Response,
          nextFunction
        );
      } catch (e: unknown) {
        expect(e instanceof Error).toBe(true);
        if (e instanceof CustomAPIError) {
          expect(e.statusCode).toBe(400);
          testState = true;
        }
      }

      expect(getPlaylistIDmockFunction).toHaveBeenCalled();
      expect(validateIDmockFunction).toHaveBeenCalled();
      expect(nextFunction).toHaveBeenCalledTimes(0);
      expect(testState).toBe(true);
    });

    it("should call the next function if the playlist link is valid", async () => {
      const getPlaylistIDmockFunction = (
        ytpl.getPlaylistID as jest.Mock
      ).mockReturnValueOnce(expect.any(String));

      const validateIDmockFunction = (
        ytpl.validateID as jest.Mock
      ).mockReturnValueOnce(true);
      try {
        await RequestMiddleware.validatePlaylistLink(
          mockRequest as Request,
          mockResponse as Response,
          nextFunction
        );
      } catch (e: unknown) {}

      expect(getPlaylistIDmockFunction).toHaveBeenCalled();
      expect(validateIDmockFunction).toHaveBeenCalled();
      expect(nextFunction).toHaveBeenCalledTimes(1);
    });
  });
});
