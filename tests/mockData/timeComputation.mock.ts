import Data from "../../src/types/types";
export const mockResourceSpeeds: string[] = [
  "9hours, 31minutes, 2seconds",
  "7hours, 55minutes, 52seconds",
  "6hours, 47minutes, 53seconds",
  "5hours, 56minutes, 54seconds",
];

export const mockFormattedResourceSpeeds: Data[] = [
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
