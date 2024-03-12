import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Adminboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-950 dark:bg-gray-950 dark:text-gray-50">
        {children}
      </body>
    </html>
  );
}
