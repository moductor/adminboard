import { isLoggedIn } from "@/utils/sessionServer";
import { redirect } from "next/navigation";
import { ReactNode } from "react";
import NavbarWrapper from "./NavbarWrapper";

type Props = {
  children: ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  if (!isLoggedIn()) redirect("/login");

  return (
    <div className="mx-auto w-screen max-w-[48rem]">
      <div className="grid min-h-screen grid-cols-[auto_1fr]">
        <div className="border-r border-gray-300 p-4 dark:border-gray-600">
          <NavbarWrapper />
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
}
