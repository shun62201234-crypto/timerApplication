// === 型・interfaceを定義 ===
export interface TimerHistory {
    id: string;
    hours: number;
    minutes: number;
    seconds: number;
}

export interface TimerState {
    id: string;
    hours: number;
    minutes: number;
    // タイマーが有効かどうかを示すプロパティを追加
    enabled: boolean; 
}

export type AppMode = "timer" | "alarm";