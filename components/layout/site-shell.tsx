import CustomCursor from "@/components/ui/custom-cursor";

export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <CustomCursor />
      <div className="pointer-events-none fixed inset-0 z-0 opacity-40">
        <div className="absolute inset-0 bg-hero-grid bg-[size:48px_48px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(83,208,255,0.06),transparent_45%)]" />
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
