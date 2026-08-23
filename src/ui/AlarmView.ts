// === HTMLへの表示・ボタン操作 ===
export class AlarmView {
    private alarmList: HTMLElement;

    constructor() {
        this.alarmList = document.querySelector("#alarm-list")!;
    }

    renderAlarm(alarms: Alarm[]): void {
        this.alarmList.innerHTML = "";

        for (const alarm of alarms) {
            // アラーム表示
        }
    }
}