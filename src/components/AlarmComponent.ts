import type { AlarmState } from "../states/AlarmState";
import type { PickerState } from "../states/PickerState";
import { TimePickerComponent } from "./TimePickerComponent";

export function AlarmComponent(alarm: AlarmState, picker: PickerState): string {
    const hasSelectedAlarm = alarm.selectedIndex !== null;

    const addDisabled = alarm.alarms.length >= 5;

    return `
        <section class="alarm-screen">

            ${TimePickerComponent(picker)}

            <button class="btn ${addDisabled ? "btn-disabled": "btn-primary"} add-button" data-action="add-alarm" type="button" ${addDisabled ? "disabled" : ""}>
                追加
            </button>

            <div class="alarm-list">
                <p class="alarm-title">アラーム一覧(最大5つ)</p>

                <div class="alarm-items">
                    <div class="alarm-column">${renderAlarmItems(alarm, 0, 3)}</div>
                    <div class="alarm-column">${renderAlarmItems(alarm, 3, 5)}</div>

                </div>

                <button class="btn ${hasSelectedAlarm ? "btn-primary" : "btn-disabled"} delete-button" data-action="delete-alarm" type="button" ${hasSelectedAlarm ? "" : "disabled"}>
                    削除
                </button>
            </div>

        </section>
    `;
}

function renderAlarmItems(alarm: AlarmState, startIndex: number, endIndex: number): string {
    return alarm.alarms.slice(startIndex, endIndex).map((time, index) => {
        const actualIndex = startIndex + index;
        const selected = index === alarm.selectedIndex;

        return `
            <button class="alarm-item ${selected ? "selected" : ""}" data-action="select-alarm" data-index="${actualIndex}" type="button">
                ${time}
            </button>
        `;
        
    }).join("");
}