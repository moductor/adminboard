import { tv } from "tailwind-variants";

export const formTextFieldClass = tv({
  base: "border-2 border-gray-300 bg-white p-2 placeholder:text-current placeholder:opacity-60 focus:outline-none focus:ring dark:border-gray-700 dark:bg-gray-800",
});

type Props = JSX.IntrinsicElements["input"];

export default function FormTextField({ className, ...props }: Props) {
  return <input className={formTextFieldClass({ className })} {...props} />;
}
