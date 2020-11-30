export function durationToSeconds(duration) {
    return duration.secs + duration.nanos * 1e-9;
}
