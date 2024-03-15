import { ReactNode } from "react";

type Props = {
  label?: string;
  children?: ReactNode;
  prefix?: ReactNode;
  suffix?: ReactNode;
};

export default function FormLabelRow({
  label,
  children,
  prefix,
  suffix,
}: Props) {
  return (
    <label className="grid gap-2">
      {label && <span className="text-sm">{label}</span>}
      <span className="relative grid">
        {prefix && (
          <span className="absolute start-3 top-[50%] -translate-y-1/2 leading-none">
            {prefix}
          </span>
        )}
        {children}
        {suffix && (
          <span className="absolute end-3 top-[50%] -translate-y-1/2 leading-none">
            {suffix}
          </span>
        )}
      </span>
    </label>
  );
}
