import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "Autonomous Job Agent",
  description: "Scout, score, and draft materials with human approvals"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-surface text-slate-100">
        <div className="mx-auto max-w-6xl px-6 py-10">{children}</div>
      </body>
    </html>
  );
}
