export interface AlarmState {
    hours: number;
    minutes: number;
    alarms: string[];
    selectedIndex: number | null;
}

// export type AlarmState = 
// | "idle"
// | "setting"
// | "alert"
// | "snooze";