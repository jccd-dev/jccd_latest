import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import type { ReactNode } from "react";

const arrowClass =
  "size-4 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none";

function ActionContent({ children }: { children: ReactNode }) {
  return (
    <>
      <span
        aria-hidden="true"
        className="relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-full bg-background text-foreground"
      >
        <ArrowUpRight
          className={`${arrowClass} [@media(hover:hover)_and_(pointer:fine)]:group-hover:-translate-y-6 [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-6`}
          strokeWidth={1.75}
        />
        <ArrowUpRight
          className={`${arrowClass} absolute -translate-x-6 translate-y-6 [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-x-0 [@media(hover:hover)_and_(pointer:fine)]:group-hover:translate-y-0`}
          strokeWidth={1.75}
        />
      </span>
      {children}
    </>
  );
}

const actionClass =
  "group inline-flex min-h-11 items-center gap-3 whitespace-nowrap rounded-full bg-foreground py-1 pl-1 pr-5 text-base text-background outline-none transition-transform duration-150 ease-out focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-4 focus-visible:ring-offset-background active:scale-[0.97] motion-reduce:transition-none motion-reduce:active:transform-none";

export function ActionLink({
  href,
  external = false,
  children,
}: {
  href: string;
  external?: boolean;
  children: ReactNode;
}) {
  const content = <ActionContent>{children}</ActionContent>;
  const className = actionClass;

  return external ? (
    <a href={href} target="_blank" rel="noreferrer" className={className}>
      {content}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  ) : (
    <Link href={href} className={className}>
      {content}
    </Link>
  );
}

// Same pill as ActionLink, for actions that submit rather than navigate.
export function ActionButton({
  type = "button",
  disabled,
  children,
}: {
  type?: "button" | "submit";
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${actionClass} disabled:pointer-events-none disabled:opacity-60`}
    >
      <ActionContent>{children}</ActionContent>
    </button>
  );
}
