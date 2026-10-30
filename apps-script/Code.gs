const SPREADSHEET_NAME = '2026_公司旅遊';
const SHEET_NAME = '報名資料';
const HEADERS = ['姓名', 'Email', '單位', '電話', '職稱'];

function doPost(event) {
  try {
    const registration = JSON.parse(event.postData.contents);
    const requiredFields = ['name', 'email', 'phone'];
    if (requiredFields.some((field) => !String(registration[field] || '').trim())) {
      return jsonResponse({ ok: false, message: '請填寫姓名、Email 和電話。' });
    }

    const email = String(registration.email).trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return jsonResponse({ ok: false, message: 'Email 格式不正確。' });
    }

    const sheet = getRegistrationSheet();
    const lock = LockService.getScriptLock();
    lock.waitLock(10000);
    try {
      const nextRow = sheet.getLastRow() + 1;
      sheet.getRange(nextRow, 4).setNumberFormat('@');
      sheet.getRange(nextRow, 1, 1, HEADERS.length).setValues([[
        cleanCell(registration.name),
        email,
        cleanCell(registration.department),
        String(registration.phone).trim(),
        cleanCell(registration.jobTitle),
      ]]);
    } finally {
      lock.releaseLock();
    }

    return jsonResponse({ ok: true });
  } catch (error) {
    console.error(error);
    return jsonResponse({ ok: false, message: '資料暫時無法儲存，請稍後再試。' });
  }
}

function getRegistrationSheet() {
  const properties = PropertiesService.getScriptProperties();
  let spreadsheetId = properties.getProperty('SPREADSHEET_ID');
  let spreadsheet;

  if (spreadsheetId) {
    spreadsheet = SpreadsheetApp.openById(spreadsheetId);
  } else {
    spreadsheet = SpreadsheetApp.create(SPREADSHEET_NAME);
    properties.setProperty('SPREADSHEET_ID', spreadsheet.getId());
  }

  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.getSheets()[0];
    sheet.setName(SHEET_NAME);
  }

  sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]);
  sheet.getRange('D:D').setNumberFormat('@');
  sheet.setFrozenRows(1);
  return sheet;
}

function cleanCell(value) {
  const text = String(value || '').trim();
  return /^[=+@]/.test(text) ? "'" + text : text;
}

function jsonResponse(payload) {
  return ContentService.createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}