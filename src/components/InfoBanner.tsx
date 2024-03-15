import { ReactNode } from "react";
import { tv } from "tailwind-variants";

export const infoBannerClass = tv({
  base: "text-wrap rounded-lg border border-opacity-20 bg-opacity-10 p-2",
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
};

export default function InfoBanner({
  className,
  children,
  variant,
  ...props
}: Props) {
  return (
    <div className={infoBannerClass({ className, ...variant })} {...props}>
      {children}
    </div>
  );
}
