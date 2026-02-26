import { cn } from "@/lib/utils";

export function SectionHeading({
  eyebrow,
  title,
  description,
  className
}: {
  eyebrow: string;
  title: string;
  description?: string;
  className?: string;
}) {
  return (
    <div className={cn("mb-10 max-w-2xl", className)}>
      <p className="mb-3 font-mono text-xs uppercase tracking-[0.22em] text-accent/90">{eyebrow}</p>
      <h2 className="text-2xl font-semibold tracking-tight text-fg sm:text-4xl">{title}</h2>
      {description ? <p className="mt-4 text-sm leading-7 text-muted sm:text-base">{description}</p> : null}
    </div>
  );
}
