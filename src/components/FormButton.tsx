import { ReactNode } from "react";
import { tv } from "tailwind-variants";

export const formButtonClass = tv({
  base: "rounded-lg bg-gray-900 px-3 py-2 font-bold leading-none text-gray-50 focus:outline-none focus:ring dark:bg-gray-50 dark:text-gray-950",
});

type Props = JSX.IntrinsicElements["button"] & { children?: ReactNode };

export default function FormButton({ className, children, ...props }: Props) {
  return (
    <button className={formButtonClass({ className })} {...props}>
      {children}
    </button>
  );
}
