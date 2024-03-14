import { ReactNode } from "react";

type Props = {
  title?: string;
  children?: ReactNode;
};

export default function VerticalNavbar({ title, children }: Props) {
  return (
    <div className="grid min-w-32 gap-6">
      {title && <p className="text-lg">{title}</p>}
      <nav className="grid gap-4">{children}</nav>
    </div>
  );
}
