export type TechCategory = {
  title: string;
  items: string[];
};

export const techStack: TechCategory[] = [
  {
    title: "Frontend",
    items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"]
  },
  {
    title: "Backend",
    items: ["Node.js", "APIs", "Python", "Automation"]
  },
  {
    title: "Infra / Ops",
    items: ["Docker", "Linux", "Cloud", "Self-hosting"]
  },
  {
    title: "Tooling",
    items: ["Git", "CLI tooling", "Scripting"]
  }
];
