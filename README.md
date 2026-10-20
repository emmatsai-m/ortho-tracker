# 矯正紀錄

個人齒顎矯正紀錄網頁 APP。手機優先，以按鈕與選單為主的隨手紀錄。

- 網址：https://emmatsai-m.github.io/ortho-tracker/
- 技術：Vite + React + TypeScript、Tailwind CSS、Firebase（Authentication、Firestore）、GitHub Pages
- 金額一律為新臺幣整數；純日期以 `YYYY-MM-DD` 字串儲存

## 目前功能

| 功能 | 說明 |
|---|---|
| 登入 | Email＋密碼；未登入一律導向登入頁 |
| 首頁 | 療程進度、下次回診倒數、費用摘要、最近紀錄、快速新增 |
| 日誌 | 回診（施作項目、下次回診日）、身體感受（疼痛 0～5、症狀）、特殊事件 |
| 費用 | 療程款、額外牙科費用、已付／待付、總花費 |
| 用品 | 採購紀錄、品牌與地點選單、數量、使用狀態（未開封／使用中／已用完） |
| 設定 | 療程基本資料、JSON 完整備份、費用 CSV、登出 |

**尚未做**：照片管理（原規劃的階段 7）。要加入時，需要啟用 Cloud Storage（必須綁定付款帳戶的 Blaze 方案），並新增 `storage.rules`。

## 費用計算定義

- 已付療程款：種類為「療程款」且狀態為「已付」的加總
- 待付：療程總價 − 已付療程款（不低於 0）
- 額外牙科費用：種類為「額外牙科費用」且已付的加總
- 用品花費：所有用品總價的加總（用品不會另外產生款項，避免重複記帳）
- 總花費：已付療程款 ＋ 額外牙科費用 ＋ 用品花費
- 狀態為「待付」的款項不計入已付與總花費

## 專案結構

```
src/
├─ auth/            登入狀態與錯誤訊息
├─ components/
│  ├─ layout/       底部分頁、頁首、快速新增、登入守衛
│  ├─ ui/           按鈕群組、欄位、對話框等共用元件
│  ├─ home/ expenses/ supplies/ logs/ settings/   各功能元件
├─ constants/options.ts   所有按鈕與選單的選項（常改這裡）
├─ firebase/client.ts     Firebase 初始化
├─ hooks/                 即時讀取資料（useProfile、usePayments…）
├─ services/              資料庫的新增、修改、刪除
├─ types/models.ts        資料型別
├─ utils/                 日期、金額、費用計算、備份匯出
└─ pages/                 各頁面
firestore.rules           Firestore 安全規則（貼到 Firebase 主控台）
.github/workflows/deploy.yml   自動部署
```

## 資料結構（Firestore）

```
users/{uid}/profile/main     療程基本資料
users/{uid}/logs/{id}        日誌
users/{uid}/payments/{id}    款項
users/{uid}/supplies/{id}    用品
```

## 日常維護

### 增減選項（施作項目、症狀、事件、用品分類…）

只改 `src/constants/options.ts`，不需要動其他檔案。
注意：已存在的紀錄存的是選項的文字，改名後舊紀錄仍顯示舊文字。

### 本機開發

1. 安裝 Node.js（LTS）。
2. `npm install`
3. 複製 `.env.example` 為 `.env.local`，填入 Firebase 網頁應用程式的四個設定值。
4. `npm run dev`，用瀏覽器開啟顯示的網址。
5. 上傳前可先執行 `npm run build` 確認沒有錯誤。

### 部署

推送到 `main` 分支，GitHub Actions 會自動建置並發布。

- 倉庫 Settings → Pages 的 Source 必須是 **GitHub Actions**。
- 倉庫 Settings → Secrets and variables → Actions → **Variables** 需要有四個變數：
  `VITE_FIREBASE_API_KEY`、`VITE_FIREBASE_AUTH_DOMAIN`、`VITE_FIREBASE_PROJECT_ID`、`VITE_FIREBASE_APP_ID`。
- `vite.config.ts` 的 `base` 必須和倉庫名稱一致（目前為 `/ortho-tracker/`）。

### 安全規則

`firestore.rules` 只放行「已登入、且是這個 UID」的存取，其他全部拒絕。
更換帳號或重建專案時，要把規則裡的 UID 換成新帳號的 UID，再到 Firebase 主控台發布。

### 備份

設定頁可匯出：
- **完整備份（JSON）**：包含療程資料、日誌、款項、用品，建議每個月匯出一次。
- **費用明細（CSV）**：款項與用品合併，可用 Excel 或 Google 試算表開啟。

備份檔包含個人資料，請存放在自己的私人空間。目前只有匯出，沒有匯入還原功能。

## 常見問題

| 狀況 | 可能原因與處理 |
|---|---|
| 網頁一片空白，原始碼裡是 `/src/main.tsx` | Pages 的 Source 不是 GitHub Actions |
| Actions 分頁顯示 "Get started" | 倉庫裡沒有 `.github/workflows/deploy.yml` |
| 登入出現「Firebase 設定有誤」 | GitHub 的四個 Variables 沒設定或名稱不一致，設定後重新部署 |
| 頁面顯示「沒有讀取／寫入權限」 | `firestore.rules` 裡的 UID 貼錯，或規則尚未發布 |
| 重新整理出現 404 | 網址必須帶 `#`，例如 `/ortho-tracker/#/logs`，請從首頁網址進入 |
| 部署後畫面沒更新 | 強制重新整理（Ctrl＋Shift＋R），手機用無痕視窗 |

## 重要提醒

- Firebase 設定值會出現在公開網頁中，本來就不是機密；資料安全靠登入與 Firestore 規則。
- `.env.local` 不會上傳到 GitHub。
- 絕對不要把服務帳戶私密金鑰、密碼放進程式碼或倉庫。
- 建議在 Google Cloud 主控台把 API 金鑰限制為只能從 `https://emmatsai-m.github.io/*` 呼叫。
