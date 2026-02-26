import Link from "next/link";
import { cn } from "@/lib/utils";

export function GlowLink({
  href,
  children,
  className,
  external = false
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-fg transition hover:border-accent/40 hover:bg-white/10 hover:shadow-glow focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60",
        className
      )}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {children}
      <span className="text-accent transition-transform group-hover:translate-x-0.5">↗</span>
    </Link>
  );
}
