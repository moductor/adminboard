import { ReactNode } from "react";

type Props = {
  title: string;
  children?: ReactNode;
  suffix?: ReactNode;
};

export default function DashboardPage({ title, children, suffix }: Props) {
  return (
    <main className="grid gap-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h1 className="text-4xl font-bold">{title}</h1>
        {suffix && <div>{suffix}</div>}
      </div>
      <div>{children}</div>
    </main>
  );
}
