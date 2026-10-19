# 矯正紀錄

個人齒顎矯正紀錄網頁 APP。手機優先，以按鈕與選單為主的隨手紀錄。

技術：Vite + React + TypeScript、Tailwind CSS、Firebase（Authentication、Firestore）、GitHub Pages。

## 本機開發

1. 安裝 Node.js（LTS）。
2. `npm install`
3. 複製 `.env.example` 為 `.env.local`，填入 Firebase 網頁應用程式的四個設定值。
4. `npm run dev`，用瀏覽器開啟顯示的網址。

## 部署

推送到 `main` 分支，GitHub Actions 會自動建置並發布到 GitHub Pages。
第一次使用前，到倉庫「Settings → Pages」，Source 選「GitHub Actions」。

網址：https://emmatsai-m.github.io/ortho-tracker/

## 重要提醒

- `.env.local` 不會上傳到 GitHub。Firebase 設定值本來就會出現在公開網頁中，不是機密；資料安全靠登入與 Firestore 規則。
- 絕對不要把服務帳戶私密金鑰、密碼放進程式碼或倉庫。
- 選項清單（施作項目、症狀、用品分類）集中在 `src/constants/options.ts`。
- `vite.config.ts` 的 `base` 必須和倉庫名稱一致。
