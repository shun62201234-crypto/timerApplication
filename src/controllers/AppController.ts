import type { AlarmService } from "../services/AlarmService";
import type { StorageService } from "../services/StorageService";
import type { TimerService } from "../services/TimerService";
import type { AlarmView } from "../ui/AlarmView";
import type { AlertView } from "../ui/AlertView";
import type { TimerView } from "../ui/TimerView";

export class AppController {
    private timerService: TimerService;
    private alarmService: AlarmService;
    private timerView: TimerView;
    private alarmView: AlarmView;
    private alertView: AlertView;
    private storageService: StorageService;

    constructor(
        timerService: TimerService,
        alarmService: AlarmService,
        timerView: TimerView,
        alarmView: AlarmView,
        alertView: AlertView,
        storageService: StorageService,
    )  {
        this.timerService = timerService;
        this.alarmService = alarmService;
        this.timerView = timerView;
        this.alarmView = alarmView;
        this.alertView = alertView;
        this.storageService = storageService;
    }


    start(): void {
        // ボタンイベントの設定
        // タイマー開始
        // アラーム登録
        // モード切替
        // ...
    }
}
