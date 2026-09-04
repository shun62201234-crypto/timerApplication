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


// === タイマー・アラーム画面の切り替え
// === タイマー・アラーム切り替えタブと画面 DOM取得 ===
const timerTab = document.querySelector<HTMLButtonElement>("#timerTab")!;
const alarmTab = document.querySelector<HTMLButtonElement>("#alarmTab")!;

const timerScreen = document.querySelector<HTMLElement>("#timerScreen")!;;
const alarmScreen = document.querySelector<HTMLElement>("#alarmScreen")!;

// === タイマー時刻設定、主要ボタン DOM取得 ===
const timerHours = document.querySelector<HTMLElement>("#timerHours")!;
const timerMinutes = document.querySelector<HTMLElement>("#timerMinutes")!;
const timerSeconds = document.querySelector<HTMLElement>("#timerSeconds")!;
const timerDisplay = document.querySelector<HTMLButtonElement>("#timerDisplay")!;
const pauseButton = document.querySelector<HTMLButtonElement>("#pauseButton")!;
const cancelButton = document.querySelector<HTMLButtonElement>("#cancelButton")!;

// === アラーム時刻設定、主要ボタン DOM取得 ===
const alarmHours = document.querySelector<HTMLElement>("#alarmHours")!;
const alarmMinutes = document.querySelector<HTMLElement>("#alarmMinutes")!;
const alarmDisplay = document.querySelector<HTMLButtonElement>("#alarmDisplay")!;
const addAlarmButton = document.querySelector<HTMLButtonElement>("#addAlarmButton")!;
const alarmItems = document.querySelector<HTMLElement>("#alarmItems")!;
const deleteAlarmButton = document.querySelector<HTMLButtonElement>("#deleteAlarmButton")!;

// === タイムピッカー DOM取得 ===
const timePicker = document.querySelector<HTMLElement>("#timePicker")!;
const hourPicker = document.querySelector<HTMLElement>("#hourPicker")!;
const minutePicker = document.querySelector<HTMLElement>("#minutePicker")!;
const secondPicker = document.querySelector<HTMLElement>("#secondPicker")!;
const secondPickerColumn = document.querySelector<HTMLElement>("#secondPickerColumn")!;
const pickerCancel = document.querySelector<HTMLButtonElement>("#pickerCancel")!;
const pickerConfirm = document.querySelector<HTMLButtonElement>("#pickerConfirm")!;

// === 状態 ===
let timerPaused = false;
let selectedAlarmIndex: number | null = null;
let alarms: string[] = [];

/* 在開いているピッカーがtimer = タイマー設定 alarm = アラーム設定どちらなのかを管理 */
type PickerMode = "timer" | "alarm";
let pickerMode: PickerMode = "timer";

/* ピッカーで選択中の値 */
let pickerHour = 0;
let pickerMinute = 0;
let pickerSecond = 0;

// === タブ切り替え ===
timerTab.addEventListener("click", () => {
    showTimer();
});

alarmTab.addEventListener("click", () => {
    showAlarm();
});

function showTimer(): void {
    timerTab.classList.add("active");
    alarmTab.classList.remove("active");

    timerScreen.hidden = false;
    alarmScreen.hidden = true;
}

function showAlarm(): void {
    timerTab.classList.remove("active");
    alarmTab.classList.add("active");

    timerScreen.hidden = true;
    alarmScreen.hidden = false;
}

// === タイマー ===
/* 状態 00：00：00 一時停止 */
pauseButton.textContent = "一時停止";

/* 一時停止 ⇔ 再開 */
pauseButton.addEventListener("click", () => {
    timerPaused = !timerPaused;

    if(timerPaused) {
        pauseButton.textContent = "再開";
    } else {
        pauseButton.textContent = "一時停止"
    }
});

/* キャンセル */
cancelButton.addEventListener("click", () => {
    setTimerValue(0, 0, 0);
    timerPaused = false;
    pauseButton.textContent = "一時停止";
});

/* タイマー表示をクリック */
timerDisplay.addEventListener("click", () => {
    pickerMode = "timer";

    secondPickerColumn.style.display = "block";

    pickerHour = getNumber(timerHours.textContent);
    pickerMinute = getNumber(timerMinutes.textContent);
    pickerSecond = getNumber(timerSeconds.textContent);

    openPicker();
});

// === タイマー値を表示 ===
function setTimerValue (hours: number, minutes: number, secounds: number): void {
    timerHours.textContent = pad(hours);
    timerMinutes.textContent = pad(minutes);
    timerSeconds.textContent = pad(secounds)
}

// === アラーム ===
alarmDisplay.addEventListener("click", () => {
    pickerMode = "alarm";

    /* アラームでは秒は不要 */
    secondPickerColumn.style.display = "none";
    
    pickerHour = getNumber(alarmHours.textContent);
    pickerMinute = getNumber(alarmMinutes.textContent);
    pickerSecond = 0;
    
    openPicker();
});

/* アラーム追加 */
addAlarmButton.addEventListener("click", () => {
    if (alarms.length >= 5) {
        return;
    }

    const time = `${alarmHours.textContent}：${alarmMinutes.textContent}`;

    alarms.push(time);

    renderAlarms();
});

/* アラーム一覧を描画 */
function renderAlarms(): void {
    alarmItems.innerHTML = "";

    alarms.forEach((time, index) => {
        const item = document.createElement("button");

        item.type = "button";

        item.className = "alarm-item";

        if (index === selectedAlarmIndex) {
            item.classList.add("selected");
        }

        item.textContent = time;

        item.addEventListener("click", () => {
            selectedAlarmIndex = index;

            renderAlarms();

            updateDeleteButton();
        });

        alarmItems.appendChild(item);
    });

    updateDeleteButton();
}

/* 削除ボタンの状態 */
function updateDeleteButton(): void {
    if (selectedAlarmIndex === null) {
        deleteAlarmButton.disabled =true;

        deleteAlarmButton.className = "btn btn-disabled delete-button"
    } else {
        deleteAlarmButton.className = "btn btn-primary delete-button"
    }
}

/* アラーム削除 */
deleteAlarmButton.addEventListener("click", () => {
    if (selectedAlarmIndex === null) {
        return;
    }

    alarms.splice(selectedAlarmIndex, 1);
    selectedAlarmIndex = null;

    renderAlarms();
});

// === ピッカーを開く ===
function openPicker(): void {
    createPickerItems();
    timePicker.hidden = false;

    /* 現在の値までスクロール */
    requestAnimationFrame(() => {
        scrollToValue(hourPicker, pickerHour);
        scrollToValue(minutePicker, pickerMinute);

        if (pickerMode === "timer") {
            scrollToValue(secondPicker, pickerSecond);
        }
    });
}

// === ピッカーを閉じる ===
function closePicker(): void {
    timePicker.hidden = true;
}

// === ピッカー項目生成 ===
function createPickerItems(): void {
    /* 時：0 ～ 23 */
    createItems(hourPicker, 24);

    /* 分：0 ～ 59 */
    createItems(minutePicker, 60);

    /* 秒：0 ～ 59 */
    createItems(secondPicker, 60);
}

// === ピッカー項目 ===
function createItems(container: HTMLElement, max: number): void {
    container.innerHTML = "";

    for(let i = 0; i < max; i++) {
        const item = document.createElement("div");

        item.className = "picker-item";

        item.dataset.value = String(i);

        item.textContent = pad(i);

        item.addEventListener("click", () => {
            scrollToValue(container, i);
        });

        container.appendChild(item);
    }
}

// === 指定値へスクロール ===
function scrollToValue (container: HTMLElement, value:number): void {
    const item = container.querySelector<HTMLElement>(`[data-value="${value}"]`);

    if (!item) {
        return;
    }

    item.scrollIntoView({
        behavior: "smooth",
        block: "center"
    });
}

// === ピッカーのスクロール終了時 ===
function getPickerValue(container: HTMLElement): number {
    const items = Array.from(container.querySelectorAll<HTMLElement>(".picker-item"));

    const containerCenter = container.getBoundingClientRect().top + container.clientHeight / 2;

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

    return Number(closestItem.dataset.value);
}

/* スクロールが止まったときに選択値を更新する */
let scrollTimer: number | undefined;

function setupPickerScroll (container: HTMLElement, type: "hour" | "minute" | "second"): void {
    container.addEventListener("scroll", () => {
        window.clearTimeout(scrollTimer);

        scrollTimer = window.setTimeout(() => {
            const value = getPickerValue(container);

            if (type === "hour") {
                pickerHour = value;
            }

            if (type === "minute") {
                pickerMinute = value;
            }

            if (type === "second") {
                pickerSecond = value;
            }
        }, 100);
    });
}

setupPickerScroll(hourPicker, "hour");
setupPickerScroll(minutePicker, "minute");
setupPickerScroll(secondPicker, "second");

// === 決定 ===
pickerConfirm.addEventListener("click", () => {
    /* 最終的にスクロール位置から値を取得 */
    pickerHour = getPickerValue(hourPicker);
    pickerMinute = getPickerValue(minutePicker);

    if (pickerMode === "timer") {
        pickerSecond = getPickerValue(secondPicker);

        setTimerValue(pickerHour, pickerMinute, pickerSecond);
    } else {
        alarmHours.textContent = pad(pickerHour);

        alarmMinutes.textContent = pad(pickerMinute);
    }
    closePicker();
});

// === ピッカーキャンセル ===
pickerCancel.addEventListener("click", () => {
    closePicker();
});

/* 背景クリックでも閉じる */
timePicker.addEventListener("click", (event) => {
    if (event.target === timePicker) {
        closePicker();
    }
});

// === ユーティリティ ===
function pad(value: number): string {
    return String(value).padStart(2, "0");
}

function getNumber(value: string | null): number {
    return Number(value ?? "0");
}

// === 初期表示 ===
showTimer();