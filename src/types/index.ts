import type { IconType } from "react-icons";

export type Platform = {
  label: string;
  icon: IconType;
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
