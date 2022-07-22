import Data from "../../src/types/types";
export const mockSpeedsResponse: Data[] = [
  {
    id: 0,
    speed: 1.25,
    length: "9hours, 31minutes, 2seconds",
  },
  {
    id: 1,
    speed: 1.5,
    length: "7hours, 55minutes, 52seconds",
  },
  {
    id: 2,
    speed: 1.75,
    length: "6hours, 47minutes, 53seconds",
  },
  {
    id: 3,
    speed: 2,
    length: "5hours, 56minutes, 54seconds",
  },
];

export const mockPlaylistSpeedsResponse = [
  {
    id: 0,
    speed: 1.25,
    length: "20hours, 47minutes, 8seconds",
  },
  {
    id: 1,
    speed: 1.5,
    length: "17hours, 19minutes, 17seconds",
  },
  {
    id: 2,
    speed: 1.75,
    length: "14hours, 50minutes, 49seconds",
  },
  {
    id: 3,
    speed: 2,
    length: "12hours, 59minutes, 28seconds",
  },
];

export const mockGetVideoInfoResponse = {
  status: true,
  message: "Video speeds computed",
  originalLength: expect.any(String),
  resourceTitle: undefined,
  speeds: mockSpeedsResponse,
};
export const mockGetPlaylistInfoResponse = {
  status: true,
  message: "Playlist speeds computed",
  originalLength: expect.any(String),
  resourceTitle: undefined,
  speeds: mockSpeedsResponse,
};
