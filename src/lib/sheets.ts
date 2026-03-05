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
  accounts: { handle: string; platforms: string[] }[];
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
    range: "Signups!A1",
    valueInputOption: "USER_ENTERED",
    requestBody: {
      values: [
        [
          new Date().toLocaleString(),
          data.fullName,
          data.email,
          data.accounts
            .map(
              (a, i) =>
                `Account ${i + 1}: @${a.handle} (${a.platforms.join(", ")})`,
            )
            .join(" | "),
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

export async function isAlreadySignedUp(email: string): Promise<boolean> {
  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Signups!C:C",
  });

  const emails = res.data.values?.flat() ?? [];
  return emails.includes(email);
}

export async function getSignupCount(): Promise<number> {
  const sheets = google.sheets({ version: "v4", auth });

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Signups!A:A",
  });

  // Subtract 1 to exclude the header row
  const rows = res.data.values ?? [];
  return Math.max(0, rows.length - 1);
}
