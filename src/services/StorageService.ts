// === タイマー処理、アラーム処理、保存処理 ===
import type { Alarm, TimerHistory } from "../models/Alarm";

export class StorageService {
    private readonly ALARM_KEY = 'alarms';
    private readonly HISTORY_KEY = 'timerHistory';

    saveAlarms(alarms: Alarm[]): void {
        localStorage.setItem(this.ALARM_KEY, JSON.stringify(alarms));
    }

    loadAlarms(): Alarm[] {
        const data = localStorage.getItem(this.ALARM_KEY);

        if(!data) {
            return [];
        }

        return JSON.parse(data);
    }

    saveHistory(history: TimerHistory[]): void {
        localStorage.setItem(this.HISTORY_KEY, JSON.stringify(history));
    }

    loadHistory(): TimerHistory[] {
        const data = localStorage.getItem(this.HISTORY_KEY);

        if(!data){
            return [];
        }

        return JSON.parse(data);
    }
}