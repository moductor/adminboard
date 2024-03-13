import { ReactNode } from "react";
import { tv } from "tailwind-variants";

export const cardClass = tv({
  base: "rounded-xl border-2 border-gray-300 bg-gray-100 p-4 shadow-lg shadow-gray-200 dark:border-gray-700 dark:bg-gray-900 dark:shadow-gray-900",
});

type Props = JSX.IntrinsicElements["div"] & { children?: ReactNode };

export default function Card({ className, children, ...props }: Props) {
  return (
    <div className={cardClass({ className })} {...props}>
      {children}
    </div>
  );
}
