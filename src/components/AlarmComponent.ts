import type { AlarmState } from "../states/AlarmState";
import { pad } from "../utils/time";

export function AlarmComponent(alarm: AlarmState): string {
    const hasSelectedAlarm = alarm.selectedIndex !== null;

    return `
    <section class="alarm-screen">
        <button class="time-display alarm-display" data-action="open-alarm-picker" type="button">
            <span>${pad(alarm.hours)}</span>
            <span class="colon">：</span>
            <span>${pad(alarm.minutes)}</span>
        </button>

        <button class="btn btn-primary add-button" data-action="add-alarm" type="button" ${alarm.alarms.length >= 5 ? "disabled" : ""}>
            追加
        </button>

        <div class="alarm-list">
            <p class="alarm-title">アラーム一覧(最大5つ)</p>

            <div>${renderAlarmItems(alarm)}</div>

            <button class="btn ${hasSelectedAlarm ? "btn-primary" : "btn-disabled"} delete-button" data-action="delete-alarm" type="button" ${hasSelectedAlarm ? "" : "disabled"}>
                削除
            </button>
        </div>

    </section>
    `;
}

function renderAlarmItems(alarm: AlarmState): string {
    return alarm.alarms.map((time, index) => {
        const selected = index === alarm.selectedIndex;

        return `
            <button class="alarm-item ${selected ? "selected" : ""}" data-action="select-alarm" data-index="${index}" type="button">
                ${time}
            </button>
        `;
        
    }).join("");
}