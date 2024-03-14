import { ReactNode } from "react";

type Props = {
  title?: string;
  children?: ReactNode;
};

export default function FormGroup({ title, children }: Props) {
  return (
    <div className="grid gap-3">
      {title && (
        <p className="text-lg font-semibold" role="heading">
          {title}
        </p>
      )}
      {children}
    </div>
  );
}
