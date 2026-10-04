import type { AlarmState } from "./AlarmState";
import type { PickerState } from "./PickerState";
import type { TimerState } from "./TimerState";

export type Screen = "timer" | "alarm";

export interface AppState {
    screen: Screen;
    timer: TimerState;
    alarm: AlarmState;
    picker: PickerState;
}

export const state: AppState = {
    screen: "timer",

    timer: {
        hours: 0,
        minutes: 0,
        seconds: 0,
        paused: false,
        running: false,
        history: [],
    },

    alarm: {
        hours: 0,
        minutes: 0,
        alarms: [],
        selectedIndex: null,
    },

    picker: {
        open: false,
        mode: "timer",
        hour: 0,
        minute: 0,
        second: 0,
    },
};