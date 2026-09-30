import { pad } from "../utils/time";
import type { PickerState } from "../states/PickerState";

export function TimePickerComponent(picker: PickerState): string {
    /*
     * picker.open === false
     * 通常状態。00:00:00 のように中央の値だけ表示する。
     */
    if (!picker.open) {
        return renderClosedPicker(picker);
    }

    /*
     * picker.open === true
     * 同じ場所でピッカーを展開する。
     */
    const showSeconds = picker.mode === "timer";

    return `
        <div class="time-picker active">
            <div class="picker-container">
                ${PickerColumn("hour", 24, picker.hour,)}
                <span class="picker-colon">：</span>
                ${PickerColumn("minute", 60, picker.minute,)}
                ${showSeconds ? `<span class="picker-colon">：</span> ${PickerColumn("second", 60, picker.second,)}`: ""}
            </div>
        </div>
    `;
}

/** ピッカーを開いていない通常状態 */
function renderClosedPicker(picker: PickerState,): string {
    const showSceconds = picker.mode === "timer";

    return `
        <button class="time-picker-closed" data-action="open-picker" type="button" aria-label="時間を設定">
            <span>${pad(picker.hour)}</span>
            <span class="picker-colon">：</span>
            <span>${pad(picker.minute)}</span>
            ${showSceconds ? `
                <span class="picker-colon">：</span>
                <span>${pad(picker.second)}</span>
            `: ""}
        </button>
    `;
}

/** 時・分・秒の1列を作る */
function PickerColumn(type: "hour" | "minute" | "second", max: number, selectedValue: number,): string {
    return `
        <div class="picker-column">
            <div class="picker" data-picker="${type}">
                ${createPickerItems(max, selectedValue)}
            </div>
        </div>
    `;
}

/** 数字を3周分作る */
function createPickerItems(max: number, selectedValue: number): string {
    const cycles = 3;

    let html = "";

    for (let cycle = 0; cycle < cycles; cycle++) {
        for (let value = 0; value < max; value++) {
            const selected = cycle === 1 && value === selectedValue;

            html += `
                <div class="picker-item ${selected ? "selected" : ""}" data-value="${value}">
                    ${pad(value)}
                </div>
            `;
        }
    }

    return html;
}