import type { Metadata } from "next";
import { ReactNode } from "react";
import TrpcProvider from "./_trpc/provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adminboard",
};

type Props = {
  children: ReactNode;
};

export default function RootLayout({ children }: Props) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-950 dark:bg-gray-950 dark:text-gray-50">
        <TrpcProvider>{children}</TrpcProvider>
      </body>
    </html>
  );
}
