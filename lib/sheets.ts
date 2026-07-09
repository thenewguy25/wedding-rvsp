import { google } from "googleapis";

export interface RsvpData {
  name: string;
  email: string;
  attending: "yes" | "no";
  guests: number;
  message: string;
}

export async function appendRsvpRow(data: RsvpData) {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: (process.env.GOOGLE_PRIVATE_KEY ?? "").replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  // Sheet columns: A timestamp, B name, C email, D guests (true total), E attending, F message
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Sheet1!A:F",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        new Date().toISOString(),
        data.name,
        data.email,
        data.guests,
        data.attending,
        data.message,
      ]],
    },
  });
}
