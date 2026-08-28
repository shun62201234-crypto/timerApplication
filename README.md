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

## ドキュメント
-   [要求仕様書](https://github.com/shun62201234-crypto/timerApplication/blob/main/document/%E4%BB%95%E6%A7%98%E6%9B%B8/%E8%A6%81%E6%B1%82%E4%BB%95%E6%A7%98%E6%9B%B8.md)
-   [画面仕様書](https://github.com/shun62201234-crypto/timerApplication/blob/main/document/%E4%BB%95%E6%A7%98%E6%9B%B8/%E7%94%BB%E9%9D%A2%E4%BB%95%E6%A7%98%E6%9B%B8.md)
-   [画面仕様（レイアウト）](https://www.figma.com/design/8OQPHxWIiMGnjalpizlU25/%E7%84%A1%E9%A1%8C?node-id=0-1&p=f&t=lJOKNjiZZYAgmUpg-0)
-   状態遷移図・状態遷移表
-   シーケンス図
-   クラス図

 ## 利用者設定
サブペルソナ案：IT勉強・資格試験の学習者
-   年齢： 20～40歳
-   職業： 会社員
-   ITスキル： 普通
-   利用端末： PC、スマートフォン
-   利用頻度： 毎日

利用目的
-   勉強時間を区切る
-   休憩時間を管理する
-   集中時間を一定にする

想定される利用シーン
-   50分勉強
-   10分休憩
   
50分勉強後、10分休憩をタイマーで設定して利用し、よく使う時間を履歴から再利用する。
また、「19:00になったら勉強開始」という用途でアラームを設定する。