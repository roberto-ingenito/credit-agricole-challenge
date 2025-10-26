import "@/styles/globals.css";
import { Viewport } from "next";
import clsx from "clsx";

import { fontSans } from "@/config/fonts";

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "white" },
    { media: "(prefers-color-scheme: dark)", color: "black" },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className={clsx("", fontSans.variable)}>
      <main className="">{children}</main>
    </div>
  );
}
