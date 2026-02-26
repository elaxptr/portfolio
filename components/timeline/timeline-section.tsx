import type { TimelineItem as TimelineItemType } from "@/types/timeline";
import { SectionShell } from "@/components/layout/section-shell";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionTransition } from "@/components/motion/section-transition";
import { TimelineItem } from "@/components/timeline/timeline-item";

export function TimelineSection({ items }: { items: TimelineItemType[] }) {
  const visibleItems = items.filter((item) => item.visible);

  return (
    <SectionShell id="timeline">
      <SectionTransition />
      <SectionHeading
        eyebrow="Experience"
        title="Developer journey timeline"
        description="Only confirmed milestones are shown. The timeline data structure supports future additions without changing the UI."
      />
      <ol className="grid gap-8">
        {visibleItems.map((item, index) => (
          <TimelineItem key={item.id} item={item} isLast={index === visibleItems.length - 1} />
        ))}
      </ol>
    </SectionShell>
  );
}
