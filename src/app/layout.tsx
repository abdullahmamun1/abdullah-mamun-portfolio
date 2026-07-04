import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: `${profile.name} — ${profile.designation}`,
  description: profile.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="h-full antialiased">
      <body className="flex min-h-full flex-col font-body">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
