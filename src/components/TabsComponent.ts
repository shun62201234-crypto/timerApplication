import type { Screen } from "../states/AppState"

export function TabsComponent(currentScreen: Screen): string {
    return `
    <nav class="tabs">
        <button class="tab ${currentScreen === "timer" ? "active" : ""}" data-action="show-timer" type="button">
        タイマー
        </button>

        <button class="tab ${currentScreen === "alarm" ? "active" : ""}" data-action="show-alarm" type="button">
        アラーム
        </button>
    </nav>
    `;
}