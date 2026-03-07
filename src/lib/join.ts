import {
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaXTwitter,
  FaLinkedin,
} from "react-icons/fa6";
import { FiGlobe } from "react-icons/fi";

import type { Platform } from "@/types";
import z from "zod";

// form schema
const accountSchema = z.object({
  handle: z.string().min(1, "Handle is required"),
  platforms: z.array(z.string()).min(1, "Select at least one platform"),
  pillar1: z.string().min(1, "At least one pillar is required"),
  pillar2: z.string().optional(),
  pillar3: z.string().optional(),
});

const joinSchema = z.object({
  fullName: z.string().min(1, "Name is required"),
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  accounts: z.array(accountSchema).min(1).max(3),
  frequency: z.string().min(1, "Select your posting frequency"),
  postingDays: z.array(z.string()).min(1, "Select at least one day"),
  goal: z.string().min(1, "Share your 30-day goal"),
});

type JoinFormData = z.infer<typeof joinSchema>;

// constants
const DAYS = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
const FREQUENCIES = ["3 times", "4 times", "5 times", "6–7 times"];
const PLATFORMS: Platform[] = [
  { label: "Instagram", icon: FaInstagram },
  { label: "TikTok", icon: FaTiktok },
  { label: "YouTube", icon: FaYoutube },
  { label: "X", icon: FaXTwitter },
  { label: "LinkedIn", icon: FaLinkedin },
  { label: "Other", icon: FiGlobe },
];

const initialForm: JoinFormData = {
  fullName: "",
  email: "",
  accounts: [
    { handle: "", platforms: [], pillar1: "", pillar2: "", pillar3: "" },
  ],
  frequency: "",
  postingDays: [],
  goal: "",
};

// helper functions
function inputClass(hasError: boolean) {
  return `bg-card border-border rounded-none focus-visible:ring-0 focus-visible:border-accent text-foreground placeholder:text-muted-foreground/50 ${
    hasError ? "border-red-500" : ""
  }`;
}

function toggleClass(active: boolean) {
  return `flex flex-col items-center px-3 py-2 text-xs tracking-widest uppercase border transition-colors ${
    active
      ? "bg-accent text-white border-accent font-medium"
      : "bg-transparent text-muted-foreground border-border hover:border-foreground/40"
  }`;
}

export {
  DAYS,
  FREQUENCIES,
  PLATFORMS,
  initialForm,
  inputClass,
  toggleClass,
  accountSchema,
  joinSchema,
  type JoinFormData,
};
