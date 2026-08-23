// === タイマー処理、アラーム処理、保存処理 ===
import { Timer } from '../models/Timer';

export class TimerService {
    private timer: Timer;
    private intervalId: number | null = null;

    constructor() {
        this.timer = new Timer();
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
    }

    getRemainingSeconds(): number {
        return this.timer.getRemainingSeconds();
    }
}