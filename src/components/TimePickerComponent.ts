import { pad } from "../utils/time";
import type { PickerState } from "../states/PickerState";

export function TimePickerComponent(picker: PickerState): string {
    const showSeconds = picker.mode === "timer";

    return `
        <div class="time-picker">
            <div class="picker-container">
                ${PickerColumn("hour", 24, picker.hour,)}
                ${PickerColumn("minute", 60, picker.minute,)}
                ${showSeconds ? PickerColumn("second", 60, picker.second,): ""}
            </div>
        </div>
    `;
}

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