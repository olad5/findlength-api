import app from "../../../src/app";
import supertest from "supertest";
import {
  mockGetPlaylistInfoResponse,
  mockGetVideoInfoResponse,
  mockPlaylistSpeedsResponse,
} from "../../mockData/appcontoller.mock";

jest.setTimeout(10000);
beforeAll(() => {
  jest.clearAllMocks();
});

describe("The App Routes", () => {
  let mockRequest = {
    url: "",
  };
  let expectedResponse = {
    status: false,
    message: "url field cannot be empty",
  };

  describe("The getVideoInfo route", () => {
    it("should return a 400 status code and an error object when you leave the url field empty", async () => {
      const response = await supertest(app)
        .post("/getVideoInfo")
        .send(mockRequest);

      expect(response.statusCode).toBe(400);

      expect(response.body).toStrictEqual(expectedResponse);
    });
    it("should return a 400 status code and a 'This is a private video. Please sign in to verify that you may see it.' ", async () => {
      mockRequest.url = "https://www.youtube.com/watch?v=-I1b8BINyEw";
      expectedResponse = {
        ...expectedResponse,
        message:
          "This is a private video. Please sign in to verify that you may see it.",
      };

      const response = await supertest(app)
        .post("/getVideoInfo")
        .send(mockRequest);

      expect(response.statusCode).toBe(400);

      expect(response.body).toStrictEqual(expectedResponse);
    });
    it("should return a 400 status code and a 'video link not valid' ", async () => {
      mockRequest.url = "https://www.youtube.com/watch?v=SJqg6Bsm2";
      expectedResponse = {
        ...expectedResponse,
        message: "video link not valid",
      };

      const response = await supertest(app)
        .post("/getVideoInfo")
        .send(mockRequest);

      expect(response.statusCode).toBe(400);

      expect(response.body).toStrictEqual(expectedResponse);
    });
    it("should return a 404 status code and a 'Video unavailable' ", async () => {
      mockRequest.url = "https://www.youtube.com/watch?v=Sp5_d9coiqU";
      expectedResponse = {
        ...expectedResponse,
        message: "Video unavailable",
      };

      const response = await supertest(app)
        .post("/getVideoInfo")
        .send(mockRequest);

      expect(response.statusCode).toBe(404);

      expect(response.body).toStrictEqual(expectedResponse);
    });
    it("should return an object of the expected response and a 200 status code", async () => {
      mockRequest.url = "https://www.youtube.com/watch?v=HfACrKJ_Y2w";
      let expectedResponse = {
        ...mockGetVideoInfoResponse,
        resourceTitle: expect.any(String),
        originalLength: "11hours, 53minutes, 48seconds",
      };

      const response = await supertest(app)
        .post("/getVideoInfo")
        .send(mockRequest);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedResponse);
    });
  });
  describe("The getPlaylistInfo route", () => {
    it("should return a 400 status code and an error object when you leave the url field empty", async () => {
      mockRequest.url = "";
      expectedResponse = {
        ...expectedResponse,
        message: "url field cannot be empty",
      };

      const response = await supertest(app)
        .post("/getPlaylistInfo")
        .send(mockRequest);

      expect(response.statusCode).toBe(400);

      expect(response.body).toStrictEqual(expectedResponse);
    });
    it("should return a 404 status code and a 'This playlist does not exist.' ", async () => {
      mockRequest.url =
        "https://www.youtube.com/playlist?list=PLm323Lc7iSW9oSIDihesMJXmMNfh8U59";
      expectedResponse = {
        ...expectedResponse,
        message: "This playlist does not exist.",
      };

      const response = await supertest(app)
        .post("/getPlaylistInfo")
        .send(mockRequest);

      expect(response.statusCode).toBe(404);

      expect(response.body).toStrictEqual(expectedResponse);
    });
    it("should return an object of the expected response and a 200 status code", async () => {
      mockRequest.url =
        "https://www.youtube.com/playlist?list=PLm323Lc7iSW9oSIDihesMJXmMNfh8U59k";
      let expectedResponse = {
        ...mockGetPlaylistInfoResponse,
        resourceTitle: expect.any(String),
        speeds: mockPlaylistSpeedsResponse,
      };

      const response = await supertest(app)
        .post("/getPlaylistInfo")
        .send(mockRequest);

      expect(response.statusCode).toBe(200);
      expect(response.body).toEqual(expectedResponse);
    });
  });
});
