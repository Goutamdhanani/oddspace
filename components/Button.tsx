import Link from "next/link";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = {
  href: string;
  variant: ButtonVariant;
  children: React.ReactNode;
};

export function Button({ href, variant, children }: ButtonProps) {
  const shared = "focus-ring inline-flex items-center justify-center rounded-[2px] px-8 py-[14px] text-label";
  const variantClasses =
    variant === "primary"
      ? "bg-flare-500 text-void-950 hover:bg-[var(--color-flare-600)]"
      : "border border-hairline-700 text-text-100 hover:border-nebula-500";

  return (
    <Link className={`${shared} ${variantClasses}`} href={href}>
      {children}
    </Link>
  );
}
