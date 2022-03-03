/**
 * Computes the speeds of a single video at 1.25x, 1.5x, 1.75x, 2x speeds
 */
function computeVideoSpeed(lengthInSeconds: number, speed: number) {
    const secondsAtspeed: number = Math.floor(lengthInSeconds / speed) // 6 41
    let time = new Date(0, 0, 0, 0, 0, secondsAtspeed)
    let hours: number = time.getHours(); //
    let minutes: number = time.getMinutes(); // 
    let seconds: number = time.getSeconds(); //
    let duration: string = hours <= 0 ? `${minutes}:${seconds}` : `${hours}:${minutes}:${seconds}`; //
    return duration;
}

/**
 * Returns the computed speeds of a single video as an array to the controller
 */
export function getVideoSpeeds(seconds: number): string[] {
    let defaultSpeeds: number[] = [1.25, 1.5, 1.75, 2]
    let computedSpeeds: string[] = []

    defaultSpeeds.forEach(speed => {
        computedSpeeds.push(computeVideoSpeed(seconds, speed))
    })

    return computedSpeeds
}
