import { ReactNode } from "react";
import { tv } from "tailwind-variants";

export const formClass = tv({
  base: "grid gap-6",
});

type Props = JSX.IntrinsicElements["form"] & { children?: ReactNode };

export default function Form({ className, children, ...props }: Props) {
  return (
    <form className={formClass({ className })} {...props}>
      {children}
    </form>
  );
}
