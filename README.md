# timerApplication

## 概要
タイマー・アラームアプリケーションは以下の機能を提供する。
-   設定した時間をカウントダウンするタイマー機能
-   指定した時刻に通知するアラーム機能
-   タイマー機能とアラーム機能の切り替え
-   タイマー履歴の保存および再利用
-   アラームの保存、ON/OFF、削除およびスヌーズ
ユーザーは、タイマー機能とアラーム機能を切り替えて利用できる。

## ディレクトリ構成
```text
timerApplication/
│─ document/
│  │
│  ├─ 仕様書/
│  │  ├─ 要求仕様書.md
│  │  └─ 画面仕様書.md
│  │
│  ├─ 仕様書/
│  │  ├─ 状態遷移図.puml
│  │  └─ 状態遷移図.md
│
│─ src/
│  │
│  ├─ main.ts
   │
   ├─ types/
   │  └─ index.ts
   │
   ├─ models/
   │  ├─ Timer.ts
   │  └─ Alarm.ts
   │
   ├─ states/
   │  ├─ TimerState.ts
   │  └─ AlarmState.ts
   │
   ├─ services/
   │  ├─ TimerService.ts
   │  ├─ AlarmService.ts
   │  └─ StorageService.ts
   │
   ├─ controllers/
   │  └─ AppController.ts
   │
   ├─ ui/
   │  ├─ TimerView.ts
   │  ├─ AlarmView.ts
   │  └─ AlertView.ts
   │
   └─ styles/
     └─ style.css
```