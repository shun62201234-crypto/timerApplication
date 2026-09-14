export interface TimerState {
    hours: number;
    minutes: number;
    seconds: number
    paused: boolean;
    running: boolean;
}


// export type TimerState = 
// | "idel"
// | "running"
// | "paused"
// | "confirmCancel"
// | "alert";