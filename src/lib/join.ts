import type { JoinFormData } from "@/types";

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
const PLATFORMS = ["Instagram", "TikTok", "YouTube", "X", "LinkedIn", "Other"];

const initialForm: JoinFormData = {
  fullName: "",
  email: "",
  handle: "",
  platforms: [],
  pillar1: "",
  pillar2: "",
  pillar3: "",
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
  return `px-3 py-2 text-xs tracking-widest uppercase border transition-colors ${
    active
      ? "bg-accent text-white border-accent font-medium"
      : "bg-transparent text-muted-foreground border-border hover:border-foreground/40"
  }`;
}

function validate(
  form: JoinFormData,
): Partial<Record<keyof JoinFormData, string>> {
  const errors: Partial<Record<keyof JoinFormData, string>> = {};
  if (!form.fullName.trim()) errors.fullName = "Name is required";
  if (!form.email.trim()) errors.email = "Email is required";
  else if (!/\S+@\S+\.\S+/.test(form.email))
    errors.email = "Enter a valid email";
  if (!form.handle.trim()) errors.handle = "Handle is required";
  if (form.platforms.length === 0)
    errors.platforms = "Select at least one platform";
  if (!form.pillar1.trim()) errors.pillar1 = "At least one pillar is required";
  if (!form.frequency) errors.frequency = "Select your posting frequency";
  if (form.postingDays.length === 0)
    errors.postingDays = "Select at least one day";
  if (!form.goal.trim()) errors.goal = "Share your 30-day goal";
  return errors;
}

export {
  DAYS,
  FREQUENCIES,
  PLATFORMS,
  initialForm,
  inputClass,
  toggleClass,
  validate,
};
