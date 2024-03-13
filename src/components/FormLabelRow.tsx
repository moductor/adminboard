import { ReactNode } from "react";

type Props = {
  label?: string;
  children?: ReactNode;
};

export default function FormLabelRow({ label, children }: Props) {
  return (
    <label className="grid gap-2">
      {label && <span className="text-sm">{label}</span>}
      {children}
    </label>
  );
}
