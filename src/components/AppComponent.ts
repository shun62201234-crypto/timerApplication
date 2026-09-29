
import { state } from "../states/AppState";
import { AlarmComponent } from "./AlarmComponent";
import { TabsComponent } from "./TabsComponent";
import { TimePickerComponent } from "./TimePickerComponent";
import { TimerComponent } from "./TimerComponent";

export function AppComponent(): string {
    return `
        <main class="app">
            ${TabsComponent(state.screen)}

            ${state.screen === "timer" ? TimerComponent(state.timer, state.picker) : AlarmComponent(state.alarm, state.picker)}

            ${TimePickerComponent(state.picker)}
        </main>
    `;
}