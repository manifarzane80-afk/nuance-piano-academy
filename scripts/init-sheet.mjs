/**
 * One-time setup script: creates the 5 required tabs in your Google Sheet
 * (if they don't already exist) and writes the header row into each.
 *
 * Usage:
 *   1) Fill in .env.local (see .env.example)
 *   2) node -r dotenv/config scripts/init-sheet.mjs dotenv_config_path=.env.local
 */
import { google } from "googleapis";

const TABS = {
  Students: ["id", "fullName", "phone", "pin", "age", "city", "level", "goal", "style", "times", "joined", "remainingSessions", "practiceAvg"],
  Sessions: ["id", "studentId", "date", "time", "status"],
  PracticeLogs: ["id", "studentId", "date", "duration", "note", "fileUrl"],
  Messages: ["id", "studentId", "from", "text", "time"],
  Files: ["id", "studentId", "name", "url", "type"],
};

async function main() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
  const key = (process.env.GOOGLE_PRIVATE_KEY || "").replace(/\\n/g, "\n");
  const sheetId = process.env.GOOGLE_SHEET_ID;

  if (!email || !key || !sheetId) {
    console.error("Missing GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY or GOOGLE_SHEET_ID.");
    process.exit(1);
  }

  const auth = new google.auth.JWT({ email, key, scopes: ["https://www.googleapis.com/auth/spreadsheets"] });
  const sheets = google.sheets({ version: "v4", auth });

  const meta = await sheets.spreadsheets.get({ spreadsheetId: sheetId });
  const existingTabs = meta.data.sheets.map((s) => s.properties.title);

  const requests = [];
  for (const tab of Object.keys(TABS)) {
    if (!existingTabs.includes(tab)) {
      requests.push({ addSheet: { properties: { title: tab } } });
    }
  }
  if (requests.length) {
    await sheets.spreadsheets.batchUpdate({ spreadsheetId: sheetId, requestBody: { requests } });
    console.log(`Created tabs: ${requests.map((r) => r.addSheet.properties.title).join(", ")}`);
  }

  for (const [tab, header] of Object.entries(TABS)) {
    await sheets.spreadsheets.values.update({
      spreadsheetId: sheetId,
      range: `${tab}!A1`,
      valueInputOption: "RAW",
      requestBody: { values: [header] },
    });
    console.log(`Header written for ${tab}`);
  }

  console.log("\nDone. Your Google Sheet is ready to use.");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
