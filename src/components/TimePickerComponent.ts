import { pad } from "../utils/time";

import type { PickerState } from "../states/PickerState";

export function TimePickerComponent(picker: PickerState): string {
    if (!picker.open) {
        return "";
    }

    const showSeconds = picker.mode === "timer";

    return `
    <div id="timePicker" class="time-picker-overlay" data-action="picker-background">
        <div class="time-picker">
            <div class="time-picker-title">時間を設定</div>

            <div class="picker-container">
                ${PickerColumn("hour", "時", 24, picker.hour,)}
                ${PickerColumn("minute", "分", 60, picker.minute,)}
                ${showSeconds ? PickerColumn("second", "秒", 60, picker.second,): ""}
            </div>

            <div class="time-picker-actions">
                <button class="btn btn-disabled" data-action="picker-cancel" type="button">
                    キャンセル
                </button>

                <button class="btn btn-primary" data-action="picker-confirm" type="button">
                    決定
                </button>
            </div>

        </div>
    </div>
    `;
}

function PickerColumn(type: "hour" | "minute" | "second", label: string, max: number, selectedValue: number): string {
    return `
    <div class="picker-column">
        <div class="picker-label>${label}</div>

        <div class="picker" data-picker="${type}">
            ${createPickerItems(max, selectedValue)}
        </div>
        
    </div>
    `;
}

function createPickerItems(max: number, selectedValue: number): string {
    let html = "";

    for (let i = 0; i < max; i++) {
        html += `
            <div class="picker-item ${i === selectedValue ? "selected" : ""}" data-value="${i}">
                ${pad(i)}
            </div>
        `
    }

    return html;
}