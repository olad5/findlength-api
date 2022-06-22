const Duration = require("duration");
import Data from "../types/types.d";

/**
 * Computes the speeds of a single video/playlist at 1.25x, 1.5x, 1.75x, 2x speeds
 **/

export const computeResourceSpeed = (
  lengthInSeconds: number,
  speed: number
): string => {
  // gets the seconds at a particular speed in integers
  const secondsAtspeed: number = Math.floor(lengthInSeconds / speed);

  let originalDuration = new Date(0, 0, 0, 0, 0, secondsAtspeed);

  // the total duration using the duration module
  let totalDuration = new Duration(
    new Date(0, 0, 0, 0, 0, 0),
    originalDuration
  );

  // each of the durations for different time points
  const durationYear: [number, string] = [totalDuration.year, "years"];
  const durationMonth: [number, string] = [totalDuration.month, "months"];
  const durationDay: [number, string] = [totalDuration.day, "days"];
  const durationHour: [number, string] = [totalDuration.hour, "hours"];
  const durationMinute: [number, string] = [totalDuration.minute, "minutes"];
  const durationSecond: [number, string] = [totalDuration.second, "seconds"];
  const durationMillisecond: [number, string] = [
    totalDuration.millisecond,
    "milliseconds",
  ];

  let outputString: string = "";

  const timeDurations: [number, string][] = [
    durationYear,
    durationMonth,
    durationDay,
    durationHour,
    durationMinute,
    durationSecond,
    durationMillisecond,
  ];

  // checks if a duration point is zero, so it doesn't add that to the computed string
  for (let i = 0; i < timeDurations.length; i++) {
    let currentDuration: number = timeDurations[i][0];
    if (currentDuration > 0) {
      outputString += `${currentDuration}${timeDurations[i][1]}, `;
    }
  }
  outputString = outputString.slice(0, outputString.length - 2); //removes the comma and space

  return outputString;
};

/**
  Returns the computed speeds of a single video/playlist as an array to the controller
**/
export const getResourceSpeed = (seconds: number): string[] => {
  let defaultSpeeds: number[] = [1.25, 1.5, 1.75, 2];
  let computedSpeeds: string[] = [];

  defaultSpeeds.forEach((speed) => {
    computedSpeeds.push(computeResourceSpeed(seconds, speed));
  });
  return computedSpeeds;
};

export const formatResourceSpeeds = (totalSeconds: number): Data[] => {
  const resourceSpeeds: string[] = getResourceSpeed(totalSeconds);
  let data: Data[] = [
    {
      id: 0,
      speed: 1.25,
      length: resourceSpeeds[0],
    },
    {
      id: 1,
      speed: 1.5,
      length: resourceSpeeds[1],
    },
    {
      id: 2,
      speed: 1.75,
      length: resourceSpeeds[2],
    },
    {
      id: 3,
      speed: 2.0,
      length: resourceSpeeds[3],
    },
  ];

  return data;
};
