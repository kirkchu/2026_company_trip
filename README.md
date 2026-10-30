# 2026 宇宙科技公司員工旅遊

員工旅遊活動資訊與報名頁面。網站部署於 GitHub Pages，報名資料由 Google Apps Script 寫入 `2026_公司旅遊` 試算表。

## 網站

GitHub Pages 網址：https://kirkchu.github.io/2026_company_trip/

## Apps Script 部署

1. 在 Google 帳號登入 clasp：`clasp login`。
2. 建立 Apps Script 專案：`clasp create --type webapp --title "2026_公司旅遊" --rootDir apps-script`。clasp 會自動建立 `.clasp.json`。
3. 推送程式：`clasp push`。
4. 部署網頁應用程式：`clasp deploy --description "員工旅遊報名"`。執行身分選擇自己，存取權設定為任何人。
5. 將部署網址填入 `script.js` 的 `SCRIPT_URL`。

第一次成功送出報名時，Apps Script 會建立 `2026_公司旅遊` 試算表及「報名資料」工作表，並將「電話」欄設定為純文字。

## 本機預覽

直接以瀏覽器開啟 `index.html`。正式部署 Apps Script 並設定網址後，表單即可寫入試算表。