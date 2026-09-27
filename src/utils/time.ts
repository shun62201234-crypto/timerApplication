// === 時間関連の処理まとめ ===

export function pad(value: number): string {
    return String(value).padStart(2, "0");
}

export function timeToSeconds(hours: number, minutes: number, seconds: number,): number {
    return hours * 3600 + minutes * 60 + seconds;
}

export function secondsToTime(totalSeconds: number): {
    hours: number;
    minutes: number;
    seconds: number;
} {
    const hours = Math.floor(totalSeconds /3600);

    const minutes = Math.floor((totalSeconds % 3600) / 60,);

    const seconds = totalSeconds % 60;

    return {
        hours,
        minutes,
        seconds,
    };
}