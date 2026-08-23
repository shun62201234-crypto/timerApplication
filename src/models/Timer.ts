// === タイマー・アラームそのものの状態・ルール ===
export class Timer {
    private hours = 0;
    private minutes = 0;
    private seconds = 0;

    // 残り時間（秒）を保持するプロパティを追加
    private remainingSeconds = 0; 

    // タイマーの状態を設定するメソッドを追加
    setTimer(hours: number, minutes: number, seconds: number): void {
        this.hours = hours;
        this.minutes = minutes;
        this.seconds = seconds;

        this.remainingSeconds = hours * 3600 + minutes * 60 + seconds; // 残り時間を計算して設定
    }

    // 残り時間を取得するメソッドを追加
    getRemainingSeconds(): number {
        return this.remainingSeconds;
    }

    // 残り時間を減らすメソッドを追加
    decrease(): void {
        if (this.remainingSeconds > 0) {
            this.remainingSeconds--;
        }
    }

    isFinished(): boolean {
        return this.remainingSeconds  === 0;
    }
}