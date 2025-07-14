export interface PersonalInfo {
  name: string;
  location: string;
  email: string;
  status: string;
}

export interface NavigationItem {
  id: string;
  label: string;
}

export interface SkillCategory {
  id: string;
  items: string[];
}

export interface SocialLink {
  id: string;
  url: string;
  icon: string;
  label: string;
}

export interface SectionProps {
  id: string;
  title: string;
  content: React.ReactNode;
}

export interface AnimationVariants {
  initial: Record<string, unknown>;
  animate: Record<string, unknown>;
  exit?: Record<string, unknown>;
}

export type TransitionProps = {
  duration: number;
  ease: number[];
  delay?: number;
}; 