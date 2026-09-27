import "./styles.css";
import { AppComponent } from "./components/AppComponent";
import { state } from "./states/AppState";
import { secondsToTime, timeToSeconds, pad } from "./utils/time";


const app = document.querySelector<HTMLDivElement>("#app");
if (!app) {
    throw new Error("#app が見つかりません");
}

// === Render ===
function render(): void {
    if (!app) {
        return;
    }

    app.innerHTML = AppComponent();

    setupPickerScroll();
    scrollPickerToSelectedValue();
}

// === tab切り替え ===
function showTimer(): void {
    state.screen = "timer";
    render();
}

function showAlarm(): void {
    state.screen = "alarm";
    render();
}

// === タイマー ===
let timerInterval: number | null = null;

function startTimer(): void {
    const totalSeconds = timeToSeconds(state.timer.hours, state.timer.minutes, state.timer.seconds,);
    if (totalSeconds <= 0) {
        return;
    }

    state.timer.running = true;
    state.timer.paused = false;

    timerInterval = window.setInterval(() => {
        if (state.timer.paused) {
            return;
        }

        const currentSeconds = timeToSeconds(state.timer.hours, state.timer.minutes, state.timer.seconds,);

        if (currentSeconds <= 1) {
            state.timer.hours = 0;
            state.timer.minutes = 0;
            state.timer.seconds = 0;

            stopTimer();
            render();

            alert("タイマーが終了しました");
            return;
        }

        const next = secondsToTime(currentSeconds - 1);
        state.timer.hours = next.hours;
        state.timer.minutes = next.minutes;
        state.timer.seconds = next.seconds;

        render();
    }, 1000);

    render();
}

function stopTimer(): void {
    if (timerInterval !== null) {
        window.clearInterval(timerInterval);
        timerInterval = null;
    }

    state.timer.running = false;
}

function togglePauseTimer(): void {
    if (!state.timer.running) {
        return;
    }

    state.timer.paused = !state.timer.paused;

    render();
}

function cancelTimer(): void {
    stopTimer();
    state.timer.hours = 0;
    state.timer.minutes = 0;
    state.timer.seconds = 0;

    state.timer.paused = false;
    state.timer.running = false;

    render();
}

// === アラーム ===
function addAlarm(): void {
    if (state.alarm.alarms.length >= 5) {
        return;
    }

    const time = `${pad(state.alarm.hours)}:${pad(state.alarm.minutes,)}`;

    state.alarm.alarms.push(time);

    render();
}

function selectAlarm(index: number): void {
    state.alarm.selectedIndex = index;

    render();
}

function deleteAlarm(): void {
    const index = state.alarm.selectedIndex;

    if (index === null) {
        return;
    }

    state.alarm.alarms.splice(index, 1);

    state.alarm.selectedIndex = null;

    render();
}

// === TimePicker ===
function openTimerPicker(): void {
    state.picker.open = true;
    state.picker.mode = "timer";

    state.picker.hour = state.timer.hours;
    state.picker.minute = state.timer.minutes;
    state.picker.second = state.timer.seconds; 

    render();
}

function openAlarmPicker(): void {
    state.picker.open = true;
    state.picker.mode = "alarm";

    state.picker.hour = state.alarm.hours;
    state.picker.minute = state.alarm.minutes;
    state.picker.second = 0;

    render();
}

function closePicker(): void {
    state.picker.open = false;
    render();
}

function confirmPicker(): void {
    const picker = state.picker;

    if (picker.mode === "timer") {
        state.timer.hours = picker.hour;
        state.timer.minutes = picker.minute;
        state.timer.seconds = picker.second;

        state.timer.paused = false;
    } else {
        state.alarm.hours = picker.hour;
        state.alarm.minutes = picker.minute;
    }

    picker.open = false;

    render();
}

// === picker Scroll ===
function setupPickerScroll(): void {
    if (!app) {
        return;
    }

    if (!state.picker.open) {
        return;
    }

    const pickers = app.querySelectorAll<HTMLElement>("[data-picker]",);

    pickers.forEach((pickers) => {
        pickers.addEventListener("scroll", () => {
            updatePickerValue(pickers);
        },);
    });
}

function updatePickerValue(container: HTMLElement,): void {
    const type = container.dataset.picker;

    const value = getPickerValue(container);

    if (type === "hour") {
        state.picker.hour = value;
    }

    if (type === "minute") {
        state.picker.minute = value;
    }

    if (type === "second") {
        state.picker.second = value;
    }
}

function getPickerValue(container: HTMLElement): number {
    const items = Array.from(container.querySelectorAll<HTMLElement>(".picker-item",),);

    if (items.length === 0) {
        return 0;
    }

    const containerRect = container.getBoundingClientRect();

    const containerCenter = containerRect.top + containerRect.height / 2;

    let closestItem = items[0];

    let closestDistance = Infinity;

    for (const item of items) {
        const rect = item.getBoundingClientRect();

        const itemCenter = rect.top + rect.height / 2;

        const distance = Math.abs(itemCenter - containerCenter);

        if (distance < closestDistance) {
            closestDistance = distance;
            closestItem = item;
        }
    }

    return Number(closestItem.dataset.value ?? 0);
}

function scrollPickerToSelectedValue(): void {
    if (!state.picker.open) {
        return;
    }

    requestAnimationFrame(() => {
        scrollToPickerValue("hour", state.picker.hour);
        scrollToPickerValue("minute", state.picker.minute);

        if (state.picker.mode === "timer") {
            scrollToPickerValue("second", state.picker.second);
        }
    });
}

function scrollToPickerValue(type: "hour" | "minute" | "second", value: number,): void {
    if (!app) {
        return;
    }
    const container = app.querySelector<HTMLElement>(`[data-picker="${type}"]`,);

    if(!container) {
        return;
    }

    const item = container.querySelector<HTMLElement>(`[data-value="${value}"]`,);

    if (!item) {
        return;
    }

    item.scrollIntoView({
        behavior: "smooth",
        block: "center",
    });
}

// === Click Event ===
app.addEventListener("click",(event) => {
    const target = event.target as HTMLElement;

    const actionElement = target.closest<HTMLElement>("[data-action]",);

    if (!actionElement) {
        return;
    }

    const action = actionElement.dataset.action;

    switch (action) {
        case "show-timer":
            showTimer();
            break;
        
        case "show-alarm":
            showAlarm();
            break;
        
        case "start-timer":
            startTimer();
            break;
        
        case "pause-timer":
            togglePauseTimer();
            break;
        
        case "cancel-timer":
            cancelTimer();
            break;
        
        case "open-timer-picker":
            openTimerPicker();
            break;
            
        case "open-alarm-picker":
            openAlarmPicker();
            break;
        
        case "add-alarm":
            addAlarm();
            break;
        
        case "select-alarm": {
            const index = Number (actionElement.dataset.index,)
            selectAlarm(index);
            break;
        };
        
        case "delete-alarm":
            deleteAlarm();
            break;
        
        case "picker-cancel":
            closePicker();
            break;
        
        case "picker-confirm":
            confirmPicker();
            break;
    }
});

// === Picker　背景クリック ===
app.addEventListener("click", (event) => {
    const target = event.target as HTMLElement;

    if (target.id === "timePicker") {
        closePicker();
    }
},);

// === 初期表示 ===
render();


// // === アプリ全体を組み立てる ===

// import { TimerService } from "./services/TimerService";
// import { AlarmService } from "./services/AlarmService";
// import { StorageService } from "./services/StorageService";

// import { TimerView } from "./ui/TimerView";
// import { AlarmView } from "./ui/AlarmView";
// import { AlertView } from "./ui/AlertView";
// import { AppController } from "./controllers/AppController";

// const timerService = new TimerService();
// const alarmService = new AlarmService();
// const storageService = new StorageService();

// const timerView = new TimerView();
// const alarmView = new AlarmView();
// const alartView = new AlertView();

// const controller = new AppController(
//     timerService,
//     alarmService,
//     timerView,
//     alarmView,
//     alartView,
//     storageService
// );

// controller.start();

// // アプリ起動処理
// const alarms = storageService.loadAlarms();

// alarmView.renderAlarms(alarms);

// // イベント設定
// // ...


// // === タイマー・アラーム画面の切り替え
// // === タイマー・アラーム切り替えタブと画面 DOM取得 ===
// const timerTab = document.querySelector<HTMLButtonElement>("#timerTab")!;
// const alarmTab = document.querySelector<HTMLButtonElement>("#alarmTab")!;

// const timerScreen = document.querySelector<HTMLElement>("#timerScreen")!;;
// const alarmScreen = document.querySelector<HTMLElement>("#alarmScreen")!;

// // === タイマー時刻設定、主要ボタン DOM取得 ===
// const timerHours = document.querySelector<HTMLElement>("#timerHours")!;
// const timerMinutes = document.querySelector<HTMLElement>("#timerMinutes")!;
// const timerSeconds = document.querySelector<HTMLElement>("#timerSeconds")!;
// const timerDisplay = document.querySelector<HTMLButtonElement>("#timerDisplay")!;
// const pauseButton = document.querySelector<HTMLButtonElement>("#pauseButton")!;
// const cancelButton = document.querySelector<HTMLButtonElement>("#cancelButton")!;

// // === アラーム時刻設定、主要ボタン DOM取得 ===
// const alarmHours = document.querySelector<HTMLElement>("#alarmHours")!;
// const alarmMinutes = document.querySelector<HTMLElement>("#alarmMinutes")!;
// const alarmDisplay = document.querySelector<HTMLButtonElement>("#alarmDisplay")!;
// const addAlarmButton = document.querySelector<HTMLButtonElement>("#addAlarmButton")!;
// const alarmItems = document.querySelector<HTMLElement>("#alarmItems")!;
// const deleteAlarmButton = document.querySelector<HTMLButtonElement>("#deleteAlarmButton")!;

// // === タイムピッカー DOM取得 ===
// const timePicker = document.querySelector<HTMLElement>("#timePicker")!;
// const hourPicker = document.querySelector<HTMLElement>("#hourPicker")!;
// const minutePicker = document.querySelector<HTMLElement>("#minutePicker")!;
// const secondPicker = document.querySelector<HTMLElement>("#secondPicker")!;
// const secondPickerColumn = document.querySelector<HTMLElement>("#secondPickerColumn")!;
// const pickerCancel = document.querySelector<HTMLButtonElement>("#pickerCancel")!;
// const pickerConfirm = document.querySelector<HTMLButtonElement>("#pickerConfirm")!;

// // === 状態 ===
// let timerPaused = false;
// let selectedAlarmIndex: number | null = null;
// let alarms: string[] = [];

// /* 在開いているピッカーがtimer = タイマー設定 alarm = アラーム設定どちらなのかを管理 */
// type PickerMode = "timer" | "alarm";
// let pickerMode: PickerMode = "timer";

// /* ピッカーで選択中の値 */
// let pickerHour = 0;
// let pickerMinute = 0;
// let pickerSecond = 0;

// // === タブ切り替え ===
// timerTab.addEventListener("click", () => {
//     showTimer();
// });

// alarmTab.addEventListener("click", () => {
//     showAlarm();
// });

// function showTimer(): void {
//     timerTab.classList.add("active");
//     alarmTab.classList.remove("active");

//     timerScreen.hidden = false;
//     alarmScreen.hidden = true;
// }

// function showAlarm(): void {
//     timerTab.classList.remove("active");
//     alarmTab.classList.add("active");

//     timerScreen.hidden = true;
//     alarmScreen.hidden = false;
// }

// // === タイマー ===
// /* 状態 00：00：00 一時停止 */
// pauseButton.textContent = "一時停止";

// /* 一時停止 ⇔ 再開 */
// pauseButton.addEventListener("click", () => {
//     timerPaused = !timerPaused;

//     if(timerPaused) {
//         pauseButton.textContent = "再開";
//     } else {
//         pauseButton.textContent = "一時停止"
//     }
// });

// /* キャンセル */
// cancelButton.addEventListener("click", () => {
//     setTimerValue(0, 0, 0);
//     timerPaused = false;
//     pauseButton.textContent = "一時停止";
// });

// /* タイマー表示をクリック */
// timerDisplay.addEventListener("click", () => {
//     pickerMode = "timer";

//     secondPickerColumn.style.display = "block";

//     pickerHour = getNumber(timerHours.textContent);
//     pickerMinute = getNumber(timerMinutes.textContent);
//     pickerSecond = getNumber(timerSeconds.textContent);

//     openPicker();
// });

// // === タイマー値を表示 ===
// function setTimerValue (hours: number, minutes: number, secounds: number): void {
//     timerHours.textContent = pad(hours);
//     timerMinutes.textContent = pad(minutes);
//     timerSeconds.textContent = pad(secounds)
// }

// // === アラーム ===
// alarmDisplay.addEventListener("click", () => {
//     pickerMode = "alarm";

//     /* アラームでは秒は不要 */
//     secondPickerColumn.style.display = "none";
    
//     pickerHour = getNumber(alarmHours.textContent);
//     pickerMinute = getNumber(alarmMinutes.textContent);
//     pickerSecond = 0;
    
//     openPicker();
// });

// /* アラーム追加 */
// addAlarmButton.addEventListener("click", () => {
//     if (alarms.length >= 5) {
//         return;
//     }

//     const time = `${alarmHours.textContent}：${alarmMinutes.textContent}`;

//     alarms.push(time);

//     renderAlarms();
// });

// /* アラーム一覧を描画 */
// function renderAlarms(): void {
//     alarmItems.innerHTML = "";

//     alarms.forEach((time, index) => {
//         const item = document.createElement("button");

//         item.type = "button";

//         item.className = "alarm-item";

//         if (index === selectedAlarmIndex) {
//             item.classList.add("selected");
//         }

//         item.textContent = time;

//         item.addEventListener("click", () => {
//             selectedAlarmIndex = index;

//             renderAlarms();

//             updateDeleteButton();
//         });

//         alarmItems.appendChild(item);
//     });

//     updateDeleteButton();
// }

// /* 削除ボタンの状態 */
// function updateDeleteButton(): void {
//     if (selectedAlarmIndex === null) {
//         deleteAlarmButton.disabled =true;

//         deleteAlarmButton.className = "btn btn-disabled delete-button"
//     } else {
//         deleteAlarmButton.className = "btn btn-primary delete-button"
//     }
// }

// /* アラーム削除 */
// deleteAlarmButton.addEventListener("click", () => {
//     if (selectedAlarmIndex === null) {
//         return;
//     }

//     alarms.splice(selectedAlarmIndex, 1);
//     selectedAlarmIndex = null;

//     renderAlarms();
// });

// // === ピッカーを開く ===
// function openPicker(): void {
//     createPickerItems();
//     timePicker.hidden = false;

//     /* 現在の値までスクロール */
//     requestAnimationFrame(() => {
//         scrollToValue(hourPicker, pickerHour);
//         scrollToValue(minutePicker, pickerMinute);

//         if (pickerMode === "timer") {
//             scrollToValue(secondPicker, pickerSecond);
//         }
//     });
// }

// // === ピッカーを閉じる ===
// function closePicker(): void {
//     timePicker.hidden = true;
// }

// // === ピッカー項目生成 ===
// function createPickerItems(): void {
//     /* 時：0 ～ 23 */
//     createItems(hourPicker, 24);

//     /* 分：0 ～ 59 */
//     createItems(minutePicker, 60);

//     /* 秒：0 ～ 59 */
//     createItems(secondPicker, 60);
// }

// // === ピッカー項目 ===
// function createItems(container: HTMLElement, max: number): void {
//     container.innerHTML = "";

//     for(let i = 0; i < max; i++) {
//         const item = document.createElement("div");

//         item.className = "picker-item";

//         item.dataset.value = String(i);

//         item.textContent = pad(i);

//         item.addEventListener("click", () => {
//             scrollToValue(container, i);
//         });

//         container.appendChild(item);
//     }
// }

// // === 指定値へスクロール ===
// function scrollToValue (container: HTMLElement, value:number): void {
//     const item = container.querySelector<HTMLElement>(`[data-value="${value}"]`);

//     if (!item) {
//         return;
//     }

//     item.scrollIntoView({
//         behavior: "smooth",
//         block: "center"
//     });
// }

// // === ピッカーのスクロール終了時 ===
// function getPickerValue(container: HTMLElement): number {
//     const items = Array.from(container.querySelectorAll<HTMLElement>(".picker-item"));

//     const containerCenter = container.getBoundingClientRect().top + container.clientHeight / 2;

//     let closestItem = items[0];

//     let closestDistance = Infinity;

//     for (const item of items) {
//         const rect = item.getBoundingClientRect();

//         const itemCenter = rect.top + rect.height / 2;

//         const distance = Math.abs(itemCenter - containerCenter);

//         if (distance < closestDistance) {
//             closestDistance = distance;

//             closestItem = item;
//         }
//     }

//     return Number(closestItem.dataset.value);
// }

// /* スクロールが止まったときに選択値を更新する */
// let scrollTimer: number | undefined;

// function setupPickerScroll (container: HTMLElement, type: "hour" | "minute" | "second"): void {
//     container.addEventListener("scroll", () => {
//         window.clearTimeout(scrollTimer);

//         scrollTimer = window.setTimeout(() => {
//             const value = getPickerValue(container);

//             if (type === "hour") {
//                 pickerHour = value;
//             }

//             if (type === "minute") {
//                 pickerMinute = value;
//             }

//             if (type === "second") {
//                 pickerSecond = value;
//             }
//         }, 100);
//     });
// }

// setupPickerScroll(hourPicker, "hour");
// setupPickerScroll(minutePicker, "minute");
// setupPickerScroll(secondPicker, "second");

// // === 決定 ===
// pickerConfirm.addEventListener("click", () => {
//     /* 最終的にスクロール位置から値を取得 */
//     pickerHour = getPickerValue(hourPicker);
//     pickerMinute = getPickerValue(minutePicker);

//     if (pickerMode === "timer") {
//         pickerSecond = getPickerValue(secondPicker);

//         setTimerValue(pickerHour, pickerMinute, pickerSecond);
//     } else {
//         alarmHours.textContent = pad(pickerHour);

//         alarmMinutes.textContent = pad(pickerMinute);
//     }
//     closePicker();
// });

// // === ピッカーキャンセル ===
// pickerCancel.addEventListener("click", () => {
//     closePicker();
// });

// /* 背景クリックでも閉じる */
// timePicker.addEventListener("click", (event) => {
//     if (event.target === timePicker) {
//         closePicker();
//     }
// });

// // === ユーティリティ ===
// function pad(value: number): string {
//     return String(value).padStart(2, "0");
// }

// function getNumber(value: string | null): number {
//     return Number(value ?? "0");
// }

// // === 初期表示 ===
// showTimer();