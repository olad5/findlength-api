import AppController from "../../../src/controllers/appcontroller";
import * as TimeComputation from "../../../src/utils/timeComputation";
import Ytdl from "../../../src/services/ytdlOps";
import { Request, Response } from "express";
import { mockFormattedResourceSpeeds } from "../../mockData/timeComputation.mock";
import {
  mockGetPlaylistInfoResponse,
  mockGetVideoInfoResponse,
} from "../../mockData/appcontoller.mock";

beforeAll(() => {
  jest.clearAllMocks();
});

describe("App Controller", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;

  describe("The getVideoInfo method", () => {
    it("should return an object of the expected response and a 200 status code", async () => {
      mockRequest = {
        body: {
          url: "",
        },
      };

      mockResponse = {
        json: jest.fn(),
      };

      const ytdlMock = jest.spyOn(Ytdl, "getVideoInfo").mockResolvedValue(
        expect.objectContaining({
          videoInfo: {
            videoDetails: {
              lengthSeconds: "",
            },
          },
        })
      );
      const computeResourceSpeedMock = jest
        .spyOn(TimeComputation, "computeResourceSpeed")
        .mockImplementation(() => expect.any(String));

      const formatResourceSpeedMock = jest
        .spyOn(TimeComputation, "formatResourceSpeeds")
        .mockImplementation(() => mockFormattedResourceSpeeds);

      await AppController.getVideoInfo(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(ytdlMock).toHaveBeenCalled();
      expect(formatResourceSpeedMock).toHaveBeenCalled();
      expect(computeResourceSpeedMock).toHaveBeenCalled();
      expect(mockResponse.statusCode).toBe(200);

      expect(mockResponse.json).toBeCalledWith(mockGetVideoInfoResponse);
    });
  });
  describe("The getPlaylistInfo method", () => {
    it("should return an object of the expected response and a 200 status code", async () => {
      mockRequest = {
        body: {
          url: "",
        },
      };

      mockResponse = {
        json: jest.fn(),
      };

      const ytdlMock = jest.spyOn(Ytdl, "getPlaylistInfo").mockResolvedValue(
        expect.objectContaining({
          Result: {
            items: expect.any(Array),
          },
        })
      );
      const computeResourceSpeedMock = jest
        .spyOn(TimeComputation, "computeResourceSpeed")
        .mockImplementation(() => expect.any(String));

      const formatResourceSpeedMock = jest
        .spyOn(TimeComputation, "formatResourceSpeeds")
        .mockImplementation(() => mockFormattedResourceSpeeds);

      await AppController.getPlaylistInfo(
        mockRequest as Request,
        mockResponse as Response
      );

      expect(ytdlMock).toHaveBeenCalled();
      expect(formatResourceSpeedMock).toHaveBeenCalled();
      expect(computeResourceSpeedMock).toHaveBeenCalled();
      expect(mockResponse.statusCode).toBe(200);
      expect(mockResponse.json).toBeCalledWith(mockGetPlaylistInfoResponse);
    });
  });
});
