export type JoinFormData = {
  fullName: string;
  email: string;
  handle: string;
  platforms: string[];
  pillar1: string;
  pillar2: string;
  pillar3: string;
  frequency: string;
  postingDays: string[];
  goal: string;
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
