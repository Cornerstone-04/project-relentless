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
  accounts: {
    handle: string;
    platforms: string[];
    pillar1: string;
    pillar2?: string;
    pillar3?: string;
  }[];
  frequency: string;
  postingDays: string[];
  goal: string;
}) {
  const sheets = google.sheets({ version: "v4", auth });
  const timestamp = new Intl.DateTimeFormat("en-GB", {
    dateStyle: "short",
    timeStyle: "short",
    timeZone: "Africa/Lagos",
  }).format(new Date());

  await sheets.spreadsheets.values.append({
    spreadsheetId: process.env.GOOGLE_SHEET_ID,
    range: "Signups!A:O",
    valueInputOption: "USER_ENTERED",
    insertDataOption: "INSERT_ROWS",
    requestBody: {
      values: [
        [
          timestamp,
          data.fullName,
          data.email,
          data.accounts[0]?.handle ?? "",
          data.accounts[0]?.platforms.join(", ") ?? "",
          [
            data.accounts[0]?.pillar1,
            data.accounts[0]?.pillar2,
            data.accounts[0]?.pillar3,
          ]
            .filter(Boolean)
            .join(", "),
          data.accounts[1]?.handle ?? "",
          data.accounts[1]?.platforms.join(", ") ?? "",
          [
            data.accounts[1]?.pillar1,
            data.accounts[1]?.pillar2,
            data.accounts[1]?.pillar3,
          ]
            .filter(Boolean)
            .join(", "),
          data.accounts[2]?.handle ?? "",
          data.accounts[2]?.platforms.join(", ") ?? "",
          [
            data.accounts[2]?.pillar1,
            data.accounts[2]?.pillar2,
            data.accounts[2]?.pillar3,
          ]
            .filter(Boolean)
            .join(", "),
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
