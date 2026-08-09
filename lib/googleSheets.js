const APPS_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbwFYgJFw4b7e43Kc-JHy1qBnjh-kfTSBcoouBIxaUq8p2Eb77RShmAHfocsPcIvawbP/exec";

async function request(action, data = {}) {
  const response = await fetch(APPS_SCRIPT_URL, {
    method: "POST",
    headers: {
      "Content-Type": "text/plain;charset=utf-8",
    },
    body: JSON.stringify({
      action,
      ...data,
    }),
    cache: "no-store",
  });

  const text = await response.text();

  let result;

  try {
    result = JSON.parse(text);
  } catch {
    throw new Error(
      `Google Sheets پاسخ نامعتبر داد: ${text.slice(0, 300)}`
    );
  }

  if (!response.ok) {
    throw new Error(
      result?.error ||
        `Google Sheets request failed: ${response.status}`
    );
  }

  if (!result?.ok) {
    throw new Error(
      result?.error || "Google Sheets error"
    );
  }

  return result;
}

export async function readSheet(tabName) {
  const result = await request("read", {
    tabName,
  });

  return result.rows || [];
}

export async function appendRow(tabName, rowObject) {
  const result = await request("append", {
    tabName,
    rowObject,
  });

  return result.rowObject || rowObject;
}

export async function updateRowById(
  tabName,
  idColumn,
  idValue,
  patch
) {
  const result = await request("update", {
    tabName,
    idColumn,
    idValue,
    patch,
  });

  return result.ok === true;
}

export function nextId(rows) {
  const max = rows.reduce(
    (maxValue, row) =>
      Math.max(
        maxValue,
        Number(row?.id) || 0
      ),
    0
  );

  return String(max + 1);
}