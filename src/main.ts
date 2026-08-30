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
const timerTab = document.querySelectorAll<HTMLButtonElement>(".tab")[0];
const alarmTab = document.querySelectorAll<HTMLButtonElement>(".tab")[1];

const timerScreen = document.querySelector<HTMLElement>(".timer-screen");
const alarmScreen = document.querySelector<HTMLElement>(".alarm-screen");

function showTimer(): void {
    timerTab.classList.add("active");
    alarmTab.classList.remove("active");

    timerScreen!.style.display = "block";
    alarmScreen!.style.display = "none";
}

function showAlarm(): void {
    timerTab.classList.remove("active");
    alarmTab.classList.add("active");

    timerScreen!.style.display = "none";
    alarmScreen!.style.display = "block";
}

timerTab.addEventListener("click", showTimer);
alarmTab.addEventListener("click", showAlarm);

showTimer();