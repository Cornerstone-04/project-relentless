import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: {
    client_email: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
  },
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

export async function appendSignup(data: {
  fullName: string;
  email: string;
  handle: string;
  platforms: string[];
  pillar1: string;
  pillar2?: string;
  pillar3?: string;
  frequency: string;
  postingDays: string[];
  goal: string;
}) {
  const sheets = google.sheets({ version: "v4", auth });

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Signups!A:K",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          new Date().toLocaleString(),
          data.fullName,
          data.email,
          `@${data.handle}`,
          data.platforms.join(", "),
          data.pillar1,
          data.pillar2 ?? "",
          data.pillar3 ?? "",
          data.frequency,
          data.postingDays.join(", "),
          data.goal,
        ],
      ],
    },
  });
}
