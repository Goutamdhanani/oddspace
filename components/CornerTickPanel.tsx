import { cn } from "@/components/cn";

type CornerTickPanelProps = {
  children: React.ReactNode;
  className?: string;
};

export function CornerTickPanel({ children, className }: CornerTickPanelProps) {
  return (
    <article className={cn("relative border border-hairline-700 bg-space-900", className)}>
      <span className="pointer-events-none absolute left-0 top-0 h-2 w-2 border-l border-t border-text-100" aria-hidden />
      <span className="pointer-events-none absolute right-0 top-0 h-2 w-2 border-r border-t border-text-100" aria-hidden />
      <span className="pointer-events-none absolute bottom-0 left-0 h-2 w-2 border-b border-l border-text-100" aria-hidden />
      <span className="pointer-events-none absolute bottom-0 right-0 h-2 w-2 border-b border-r border-text-100" aria-hidden />
      {children}
    </article>
  );
}
