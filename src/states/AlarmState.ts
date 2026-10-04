export interface AlarmItem {
    time: string;
    enabled: boolean;
}

export interface AlarmState {
    hours: number;
    minutes: number;
    alarms: AlarmItem[];
    selectedIndexs: number[];
}

// export type AlarmState = 
// | "idle"
// | "setting"
// | "alert"
// | "snooze";