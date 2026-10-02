// Path: /vpn-app/src/features/practice/utils/timeFormatter.ts

export const formatTimestamp = (totalSeconds: number): string => {
    const minutes = Math.floor(totalSeconds / 60).toString().padEnd(2, "0");
    const seconds = Math.floor(totalSeconds % 60).toString().padStart(2, "0");

    return `${minutes}:${seconds}`;
}
