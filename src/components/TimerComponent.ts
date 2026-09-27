import type { TimerState } from "../states/TimerState";
import { pad } from "../utils/time";

export function TimerComponent(timer: TimerState): string {
    const startDisabled = timer.running || isTimerEmpty(timer);
    const pauseDisabled = !timer.running;

    return `
    <section class="timer-screen">
        <button class="time-display timer-display" data-action="open-timer-picker" type="button" aria-label="タイマー時間を設定">
            <span>${pad(timer.hours)}</span>
            <span class="colon">：</span>
            <span>${pad(timer.minutes)}</span>
            <span class="colon">：</span>
            <span>${pad(timer.seconds)}</span>
        </button>

        <div class="timer-actions">
            <button class="btn ${startDisabled ? "btn-disabled" : "btn-primary"}" data-action="start-timer" type="button" ${startDisabled ? "disabled": ""}>
                開始
            </button>

            <button class="btn ${pauseDisabled ? "btn-disabled" : "btn-primary"}" data-action="pause-timer" type="button" ${pauseDisabled ? "disabled": ""}>
            ${timer.paused ? "開始" : "一時停止"}
            </button>

            <button class="btn btn-primary" data-action="cancel-timer" type="button">
                キャンセル
            </button>
        </div>

        <div class="history">
            <p class="history-title">タイマー履歴（最大5つ）</p>

            <div id="timerHistory" class="history-list"></div>
        </div>

    </section>
    `;
}

function isTimerEmpty(timer: TimerState): boolean {
    return (timer.hours === 0 && timer.minutes === 0 && timer.seconds === 0);
}