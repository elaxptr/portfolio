import { GlassPanel } from "@/components/ui/glass-panel";

export function SkillCard({ title, description }: { title: string; description: string }) {
  return (
    <GlassPanel className="p-5">
      <h3 className="text-sm font-medium text-fg">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
    </GlassPanel>
  );
}
