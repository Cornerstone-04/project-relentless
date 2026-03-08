const RESEND_API_KEY = process.env.RESEND_API_KEY;
const PROJECT_DOCS_URL = process.env.PROJECT_DOCS_URL;
const PROJECT_SHEETS_URL = process.env.PROJECT_SHEETS_URL;
const WHATSAPP_GROUP_URL = process.env.WHATSAPP_GROUP_URL;

const PREVIEW_DETAILS = {
  fullName: "Alex Rivera",
  accounts: [
    {
      handle: "arivera_dev",
      platforms: ["X", "LinkedIn"],
      pillar1: "Software Engineering",
      pillar2: "Digital Nomad Life",
      pillar3: "Vlogging",
    },
    {
      handle: "arivera_dev",
      platforms: ["X", "LinkedIn"],
      pillar1: "Software Engineering",
      pillar2: "Digital Nomad Life",
      pillar3: "Vlogging",
    },
    {
      handle: "arivera_dev",
      platforms: ["X", "LinkedIn"],
      pillar1: "Software Engineering",
      pillar2: "Digital Nomad Life",
      pillar3: "Vlogging",
    },
  ],
  frequency: "3",
  postingDays: ["Monday", "Wednesday", "Friday"],
  goal: "Build a community of 500 builders",
  trackerUrl: "https://example.com/tracker",
  guideUrl: "https://example.com/guide",
  whatsappUrl: "https://chat.whatsapp.com",
};

export {
  RESEND_API_KEY,
  PREVIEW_DETAILS,
  PROJECT_DOCS_URL,
  PROJECT_SHEETS_URL,
  WHATSAPP_GROUP_URL,
};
