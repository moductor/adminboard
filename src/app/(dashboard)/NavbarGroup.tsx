import { ReactNode } from "react";

type Props = {
  title?: string;
  children?: ReactNode;
};

export default function NavbarGroup({ title, children }: Props) {
  return (
    <div className="grid gap-2">
      {title && <p className="text-sm font-bold leading-none">{title}</p>}
      {children}
    </div>
  );
}
