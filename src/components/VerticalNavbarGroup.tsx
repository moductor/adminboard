import { ReactNode } from "react";

type Props = {
  title?: string;
  children?: ReactNode;
};

export default function VerticalNavbarGroup({ title, children }: Props) {
  if (!children) return <></>;

  return (
    <div className="grid gap-2">
      {title && <p className="text-sm font-bold leading-none">{title}</p>}
      {children}
    </div>
  );
}
