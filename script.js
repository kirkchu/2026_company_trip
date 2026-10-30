const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbxbbe3AuX4-uzc-aYMl5UldzCCZrz0KHgd-pTzvRE7WjN0xryDTkl7QgPPmGYPDeKJggw/exec";

const form = document.querySelector("#registration-form");
const statusMessage = document.querySelector("#form-status");
const submitButton = form.querySelector("button[type='submit']");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  statusMessage.textContent = "";
  statusMessage.removeAttribute("data-state");

  if (SCRIPT_URL.startsWith("PASTE_")) {
    statusMessage.dataset.state = "error";
    statusMessage.textContent = "報名服務尚未完成部署，請稍後再試。";
    return;
  }

  const formData = new FormData(form);
  const registration = Object.fromEntries(formData.entries());
  submitButton.disabled = true;
  submitButton.querySelector("span").textContent = "送出中…";

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(registration),
    });
    form.reset();
    statusMessage.textContent = "報名資料已送出，期待與你一起出發！";
  } catch {
    statusMessage.dataset.state = "error";
    statusMessage.textContent = "目前無法送出，請確認網路連線後再試一次。";
  } finally {
    submitButton.disabled = false;
    submitButton.querySelector("span").textContent = "送出報名";
  }
});