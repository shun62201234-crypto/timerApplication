import type { TimerState } from "../states/TimerState";
import type { PickerState } from "../states/PickerState";
import { TimePickerComponent } from "./TimePickerComponent";

export function TimerComponent(timer: TimerState, picker: PickerState): string {
    /**  ピッカーで現在選択されている値。
     * ピッカーを開いている間は picker の値を使う。閉じている場合も、通常は timer と同期している。
     */
    const selectedTotal = picker.hour * 3600 + picker.minute * 60 + picker.second;
    /** 00:00:00 の場合は開始できない。すでに動作中の場合も開始できない。*/
    const startDisabled = timer.running || selectedTotal <= 0;
    /** */
    const pauseDisabled = !timer.running;

    return `
        <section class="timer-screen">
            ${TimePickerComponent(picker)}

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

                <div class="history-list">
                    <div class="history-column">${renderHistoryItems(timer.history, 0, 3)}</div>
                    <div class="history-column">${renderHistoryItems(timer.history, 3, 5)}</div>
                </div>

            </div>

        </section>
    `;
}

function renderHistoryItems(history: string[], startIndex: number, endIndex: number): string {
    return history.slice(startIndex, endIndex).map((time, index) => {
        const actualIndex = startIndex + index;
        return `
            <div class="history-item">${actualIndex}${time}</div>
        `;
    }).join("");
}