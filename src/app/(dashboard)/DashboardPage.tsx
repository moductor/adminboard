import { ReactNode } from "react";

type Props = {
  title: string;
  children?: ReactNode;
};

export default function DashboardPage({ title, children }: Props) {
  return (
    <main className="grid gap-8">
      <h1 className="text-4xl font-bold">{title}</h1>
      <div>{children}</div>
    </main>
  );
}
