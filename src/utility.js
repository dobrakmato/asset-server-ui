export function durationToSeconds(duration) {
    return duration.secs + duration.nanos * 1e-9;
}

export function copyToClipboard(text) {
    return navigator.clipboard.writeText(text);
}
