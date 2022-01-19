export function formattedTime(time: number) {
    return new Date((time + new Date().getTimezoneOffset() * 60) * 1000)
        .toLocaleTimeString()
        .replace(/^00:/, "");
}
