import { pad } from "../utils/time";
import type { PickerState } from "../states/PickerState";

export function TimePickerComponent(picker: PickerState): string {
    /*
     * picker.open === true
     * 同じ場所でピッカーを展開する。
     */
    const showSeconds = picker.mode === "timer";

    // ピッカーを閉じている状態
    if (!picker.open) {
        return `
            <button class="time-picker-closed" data-action="open-picker" type="button" aria-label="時間を設定">
                <span class="time-value">${pad(picker.hour)}</span>
                <span class="picker-colon">：</span>
                <span class="time-value">${pad(picker.minute)}</span>
                ${showSeconds ? `<span class="picker-colon">：</span> <span class="time-value">${pad(picker.second)}</span> `: ""}
            </button>
        `;
    }

    /** ピッカーを開いている状態 */
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

/** 時・分・秒の1列を作る */
function PickerColumn(type: "hour" | "minute" | "second", max: number, selectedValue: number,): string {
    return `
        <div class="picker-column">
            <div class="picker" data-picker="${type}">
                <div class="picker-spacer"></div>
                ${createPickerItems(max, selectedValue)}
                <div class="picker-spacer"></div>
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