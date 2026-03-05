import type { IconType } from "react-icons";

export type Platform = {
  label: string;
  icon: IconType;
};

export type Account = {
  handle: string;
  platforms: string[];
};

export type PillarInfoProps = {
  showPillarInfo: boolean;
  setShowPillarInfo: React.Dispatch<React.SetStateAction<boolean>>;
};

export type FormSectionProps = {
  number: string;
  title: string;
  children: React.ReactNode;
  delay?: number;
};

export type ConfirmationEmailProps = {
  fullName: string;
  accounts: Account[];
  pillar1: string;
  pillar2?: string;
  pillar3?: string;
  frequency: string;
  postingDays: string[];
  goal: string;
  trackerUrl: string;
  guideUrl: string;
};
