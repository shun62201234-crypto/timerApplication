
import { state } from "../states/AppState";
import { AlarmComponent } from "./AlarmComponent";
import { TabsComponent } from "./TabsComponent";
import { TimePickerComponent } from "./TimePickerComponent";
import { TimerComponent } from "./TimerComponent";

export function AppComponent(): string {
    return `
    <main class="app">
        ${TabsComponent(state.screen)}

        ${state.screen === "timer" ? TimerComponent(state.timer) : AlarmComponent(state.alarm)}

        ${TimePickerComponent(state.picker)}
    </main>
    `;
}