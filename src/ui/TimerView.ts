// === HTMLへの表示・ボタン操作 ===
export class TimerView {
    private startButton: HTMLButtonElement;
    private pauseButton: HTMLButtonElement;
    private cancelButton: HTMLButtonElement;
    private display: HTMLElement;

    constructor() {
        this.startButton = document.querySelector("#thimer-start")!;
        this.pauseButton = document.querySelector("#timer-pause")!;
        this.cancelButton = document.querySelector("#timer-cancel")!;
        this.display = document.querySelector("#timer-display")!;
    }

    setDisplay(time: string): void {
        this.display.textContent = time;
    }

    setStartButtonEnable(enable: boolean): void {
        this.startButton.disabled = !enable;
    }
}