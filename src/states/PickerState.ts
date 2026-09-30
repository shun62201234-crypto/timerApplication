export type PickerMode = "timer" | "alarm";
export interface PickerState {
    open: boolean;
    mode: PickerMode;
    hour: number;
    minute: number;
    second: number;
}