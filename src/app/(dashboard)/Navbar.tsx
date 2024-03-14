import { ReactNode } from "react";

type Props = {
  children?: ReactNode;
};

export default function Navbar({ children }: Props) {
  return (
    <div className="grid min-w-32 gap-6">
      <p className="text-lg">Adminboard</p>
      <nav className="grid gap-4">{children}</nav>
    </div>
  );
}
