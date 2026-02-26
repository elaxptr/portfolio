import { cn } from "@/lib/utils";

export function GlassPanel({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("glass-panel rounded-2xl shadow-glow", className)}>{children}</div>;
}
