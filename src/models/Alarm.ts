// === タイマー・アラームそのものの状態・ルール ===
import type { Alarm as AlarmData } from '../types/Alarm';

export class AlarmModel {
    private alarm: AlarmData;

    constructor(alarm: AlarmData) {
        this.alarm = alarm;
    }

    getData(): AlarmData {
        return this.alarm;
    }

    disable(): void {
        this.alarm.enabled = false;
    }

    toggle(): void {
        this.alarm.enabled = !this.alarm.enabled;
    }
}