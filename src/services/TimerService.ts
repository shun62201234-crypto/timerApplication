// === タイマー処理、アラーム処理、保存処理 ===
import { Timer } from '../models/Timer';
import type { TimerState } from '../states/TimerState';

export class TimerService {
    private state: TimerState = "idel"
    private timer: Timer;
    private intervalId: number | null = null;

    constructor() {
        this.timer = new Timer();
    }

    getState(): TimerState {
        return this.start;
    }

    start(): void {
        if (this.intervalId !== null) {
            return;
        }

        this.intervalId = window.setInterval(() => {
            this.timer.decrease();

            if (this.timer.isFinished()) {
                this.stop();
            }
        }, 1000);
    }

    stop(): void {
        this.stop();
    }

    pause(): void {
        this.stop();
        if (this.state !== "running") {
            return;
        }
        this.state = "paused";

        // カウントダウン停止
    }

    resume(): void {
        if(this.state !== "paused") {
            return;
        }
        this.state = "running";

        // カウントダウン再開
    }

    getRemainingSeconds(): number {
        return this.timer.getRemainingSeconds();
    }

    finish(): void {
        this.state = "alert"
    }

    cancel(): void {
        this.state = "idel";
    }
}