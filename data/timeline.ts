import type { TimelineItem } from "@/types/timeline";

export const timelineItems: TimelineItem[] = [
  {
    id: "started-2018",
    dateLabel: "2018",
    title: "Started development journey",
    description: "Began building software and learning core development fundamentals.",
    visible: true,
    kind: "journey"
  },
  {
    id: "freelance-2025",
    dateLabel: "Late 2025",
    title: "Started freelancing",
    description: "Began taking freelance work and delivering projects for clients.",
    visible: true,
    kind: "freelance"
  },
  {
    id: "todo-1",
    dateLabel: "TODO",
    title: "Future milestone slot",
    description: "Add a real milestone here when available.",
    visible: false,
    kind: "project"
  },
  {
    id: "todo-2",
    dateLabel: "TODO",
    title: "Future milestone slot",
    description: "Add a real milestone here when available.",
    visible: false,
    kind: "project"
  }
];
