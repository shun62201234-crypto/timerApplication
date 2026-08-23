// === タイマー処理、アラーム処理、保存処理 ===

import type { Alarm } from "../models/Alarm";

export class AlarmService {
    private alarms: Alarm[] = [];

    addAlarm(alarm: Alarm): boolean {
        if (this.alarms.length >= 5) {
            return false; // 5件以上のアラームは追加できない
        }
        this.alarms.push(alarm);
        return true;
    }

    removeAlarm(ids: string[]): void {
        this.alarms = this.alarms.filter(alarms => !ids.includes(alarms.id));
    }

    toggleAlarm(id: string): void {
        const alarm = this.alarms.find(alarm => alarm.id === id);

        if(alarm) {
            alarm.enabled = !alarm.enabled;
        }
    }

    getAlarms(): Alarm[] {
        return [...this.alarms];
    }

}