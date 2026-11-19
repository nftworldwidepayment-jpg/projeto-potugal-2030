import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "inverse" | "inverse-outline";
type Size = "md" | "lg";

const base =
  "group inline-flex items-center justify-center gap-2 rounded-lg font-medium whitespace-nowrap " +
  "transition-[background-color,color,box-shadow] duration-200 ease-out " +
  "focus-visible:outline-2 focus-visible:outline-offset-2";

const variants: Record<Variant, string> = {
  primary: "bg-navy text-white shadow-card hover:bg-navy-hover focus-visible:outline-steel",
  secondary:
    "bg-white text-ink ring-1 ring-line ring-inset hover:bg-surface hover:ring-line-strong focus-visible:outline-steel",
  inverse: "bg-white text-navy hover:bg-mist focus-visible:outline-white",
  "inverse-outline":
    "text-white ring-1 ring-white/30 ring-inset hover:bg-white/10 hover:ring-white/50 focus-visible:outline-white",
};

const sizes: Record<Size, string> = {
  md: "h-10 px-4 text-sm",
  lg: "h-12 px-6 text-[15px]",
};

export function buttonClasses({
  variant = "primary",
  size = "md",
  className,
}: {
  variant?: Variant;
  size?: Size;
  className?: string;
}) {
  return cn(base, variants[variant], sizes[size], className);
}

type ButtonLinkProps = ComponentProps<typeof Link> & {
  variant?: Variant;
  size?: Size;
  withArrow?: boolean;
};

export function ButtonLink({
  variant,
  size,
  withArrow = false,
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={buttonClasses({ variant, size, className })} {...props}>
      {children}
      {withArrow && (
        <ArrowRight
          aria-hidden="true"
          className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
        />
      )}
    </Link>
  );
}
