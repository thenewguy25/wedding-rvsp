import { google } from "googleapis";

export interface RsvpData {
  name: string;
  email: string;
  attending: "yes" | "no";
  guests: number;
  meal: string;
  message: string;
}

export async function appendRsvpRow(data: RsvpData) {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: (process.env.GOOGLE_PRIVATE_KEY ?? "").replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Sheet1!A:G",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        new Date().toISOString(),
        data.name,
        data.email,
        data.attending,
        data.guests,
        data.meal,
        data.message,
      ]],
    },
  });
}
