import { ReactNode } from "react";
import { tv } from "tailwind-variants";

export const formContentClass = tv({
  base: "grid gap-6",
});

type Props = JSX.IntrinsicElements["div"] & { children?: ReactNode };

export default function FormContent({ className, children, ...props }: Props) {
  return (
    <div className={formContentClass({ className })} {...props}>
      {children}
    </div>
  );
}
