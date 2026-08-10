import { google } from "googleapis";

export interface RsvpData {
  name: string;
  email: string;
  phone: string;
  attending: "yes" | "no";
  additionalGuests: number;
  guestNames: string;
  kids5to12: number;
  kidsUnder5: number;
  total: number;
  message: string;
}

export async function appendRsvpRow(data: RsvpData) {
  const auth = new google.auth.JWT({
    email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    key: (process.env.GOOGLE_PRIVATE_KEY ?? "").replace(/\\n/g, "\n"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  const sheets = google.sheets({ version: "v4", auth });

  // Sheet columns: A Timestamp, B Name, C Email, D Phone, E Attending?, F Additional Guest,
  // G Guest's names, H Kids from 5-12, I Kids under 5, J Total, K Message
  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Sheet1!A:K",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [[
        new Date().toISOString(),
        data.name,
        data.email,
        data.phone,
        data.attending,
        data.additionalGuests,
        data.guestNames,
        data.kids5to12,
        data.kidsUnder5,
        data.total,
        data.message,
      ]],
    },
  });
}
