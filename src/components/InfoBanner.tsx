import { ReactNode } from "react";
import { tv } from "tailwind-variants";

export const infoBannerClass = tv({
  base: "grid gap-1 text-wrap rounded-xl border border-opacity-20 bg-opacity-10 p-2",
  variants: {
    color: {
      info: "border-sky-500 bg-sky-500 text-sky-500",
      error: "border-red-500 bg-red-500 text-red-500",
    },
  },
  defaultVariants: { color: "info" },
});

type Props = JSX.IntrinsicElements["p"] & {
  children?: ReactNode;
  variant?: typeof infoBannerClass.defaultVariants;
  title?: string;
  icon?: ReactNode;
};

export default function InfoBanner({
  className,
  children,
  variant,
  title,
  icon,
  ...props
}: Props) {
  return (
    <div className={infoBannerClass({ className, ...variant })} {...props}>
      {title && (
        <p
          className="grid grid-cols-[1em_1fr] items-center gap-1 text-lg font-bold"
          role="heading"
        >
          {icon && <span>{icon}</span>}
          <span className="">{title}</span>
        </p>
      )}

      {children}
    </div>
  );
}
