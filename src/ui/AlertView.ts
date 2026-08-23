// === タイマーとアラームの通知画面を担当 ===
export class AlertView {
    private alertElement: HTMLElement;
    private messageElement: HTMLElement;
    private endBUtton: HTMLButtonElement;

    constructor() {
        this.alertElement = document.querySelector("#alert")!;
        this.messageElement = document.querySelector("#alert-message")!;
        this.endBUtton = document.querySelector("#alert-end")!;
    }

    show(message: string): void {
        this.messageElement.textContent = message;
        this.alertElement.classList.remove("hidden");
    }

    hide(): void {
        this.alertElement.classList.add("hidden");
    }
}