import * as TimeComputation from "../../src/utils/timeComputation";
import {
  mockResourceSpeeds,
  mockFormattedResourceSpeeds,
} from "../mockData/timeComputation.mock";

beforeAll(() => {
  jest.clearAllMocks();
});

describe("Time computation utility", () => {
  describe("Compute Resource Speed", () => {
    it("should return a string representing a time duration", () => {
      const lengthInSeconds = 42828;
      expect(TimeComputation.computeResourceSpeed(lengthInSeconds, 1.25)).toBe(
        "9hours, 31minutes, 2seconds"
      );
      expect(TimeComputation.computeResourceSpeed(lengthInSeconds, 1.75)).toBe(
        "6hours, 47minutes, 53seconds"
      );
    });
  });
  describe("Get Resource Speed", () => {
    it("should return a 4-element array of strings of durations of the resource ", () => {
      const computeResourceSpeedMock = jest
        .spyOn(TimeComputation, "computeResourceSpeed")
        .mockImplementation(() => expect.any(String));

      const seconds = 42828;
      expect(TimeComputation.getResourceSpeed(seconds)).toEqual([
        expect.any(String),
        expect.any(String),
        expect.any(String),
        expect.any(String),
      ]);
      expect(TimeComputation.getResourceSpeed(seconds)).toHaveLength(4);
      expect(computeResourceSpeedMock).toHaveBeenCalled();
      expect(computeResourceSpeedMock).toReturnWith(expect.any(String));
    });
  });

  describe("Format Resource Speeds", () => {
    it("should return an object that has an id, speed and length   ", () => {
      const getResourceSpeedMock = jest
        .spyOn(TimeComputation, "getResourceSpeed")
        .mockImplementation(() => {
          return mockResourceSpeeds;
        });

      const totalSeconds = 42828;

      expect(TimeComputation.formatResourceSpeeds(totalSeconds)).toEqual(
        mockFormattedResourceSpeeds
      );
      expect(getResourceSpeedMock).toHaveBeenCalled();
      expect(getResourceSpeedMock).toReturnWith(mockResourceSpeeds);
    });
  });
});
