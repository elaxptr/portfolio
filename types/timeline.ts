export type TimelineItem = {
  id: string;
  dateLabel: string;
  title: string;
  description: string;
  visible: boolean;
  kind?: "journey" | "freelance" | "project";
};
