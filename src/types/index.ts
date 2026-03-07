import type { IconType } from "react-icons";

type Platform = {
  label: string;
  icon: IconType;
};

type Account = {
  handle: string;
  platforms: string[];
  pillar1: string;
  pillar2?: string;
  pillar3?: string;
};

type PillarInfoProps = {
  showPillarInfo: boolean;
  setShowPillarInfo: React.Dispatch<React.SetStateAction<boolean>>;
};

type FormSectionProps = {
  number: string;
  title: string;
  children: React.ReactNode;
  delay?: number;
};

type ConfirmationEmailProps = {
  fullName: string;
  accounts: Account[];
  frequency: string;
  postingDays: string[];
  goal: string;
  trackerUrl: string;
  guideUrl: string;
  whatsappUrl: string;
};

export type {
  Account,
  ConfirmationEmailProps,
  FormSectionProps,
  PillarInfoProps,
  Platform,
};
