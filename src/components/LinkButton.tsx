import { ReactNode } from "react";
import { formButtonClass } from "./FormButton";

type Props = JSX.IntrinsicElements["a"] & { children?: ReactNode };

export default function LinkButton({ className, children, ...props }: Props) {
  return (
    <a className={formButtonClass({ className })} {...props}>
      {children}
    </a>
  );
}
