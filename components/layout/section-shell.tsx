import { Container } from "@/components/layout/container";
import { cn } from "@/lib/utils";

export function SectionShell({
  id,
  className,
  children
}: {
  id?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className={cn("relative py-20 sm:py-28", className)}>
      <Container>{children}</Container>
    </section>
  );
}
