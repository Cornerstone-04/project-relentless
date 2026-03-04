import type { IconType } from "react-icons";

// export type JoinFormData = {
//   fullName: string;
//   email: string;
//   handle: string;
//   platforms: string[];
//   pillar1: string;
//   pillar2: string;
//   pillar3: string;
//   frequency: string;
//   postingDays: string[];
//   goal: string;
// };
//

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
