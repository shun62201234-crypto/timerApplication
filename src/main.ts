// === アプリ全体を組み立てる ===

import { TimerService } from "./services/TimerService";
import { AlarmService } from "./services/AlarmService";
import { StorageService } from "./services/StorageService";

import { TimerView } from "./ui/TimerView";
import { AlarmView } from "./ui/AlarmView";
import { AlertView } from "./ui/AlertView";
import { AppController } from "./controllers/AppController";

const timerService = new TimerService();
const alarmService = new AlarmService();
const storageService = new StorageService();

const timerView = new TimerView();
const alarmView = new AlarmView();
const alartView = new AlertView();

const controller = new AppController(
    timerService,
    alarmService,
    timerView,
    alarmView,
    alartView,
    storageService
);

controller.start();

// アプリ起動処理
const alarms = storageService.loadAlarms();

alarmView.renderAlarms(alarms);

// イベント設定
// ...