# 2026 宇宙科技公司員工旅遊

員工旅遊活動資訊與報名頁面。網站部署於 GitHub Pages，報名資料由 Google Apps Script 寫入 `2026_公司旅遊` 試算表。

## 網站

GitHub Pages 網址：https://kirkchu.github.io/2026_company_trip/

## Google 試算表

試算表名稱為 `2026_公司旅遊`，工作表名稱為「報名資料」。Apps Script 已綁定此試算表，網頁應用程式以擁有者身分執行並允許所有人存取。

要修改接收程式，請在試算表選擇「擴充功能 > Apps Script」，或在本機修改 `apps-script/Code.gs` 後執行 `clasp push`。部署新版本時，在 Apps Script 選擇「部署 > 管理部署作業 > 編輯」，建立新版本並更新部署。

「電話」欄以純文字格式寫入，以保留前導零與國碼。

## 本機預覽

直接以瀏覽器開啟 `index.html`。正式部署 Apps Script 並設定網址後，表單即可寫入試算表。