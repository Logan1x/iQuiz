import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { UserProvider } from "@/contexts/user";
import Nav from "@/components/nav/nav";
import dynamic from "next/dynamic";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "iQuiz",
  description: "generate quizzes in seconds",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const CrispWithNoSSR = dynamic(() => import("@/components/crisp/crisp"));

  return (
    <html lang="en">
      <CrispWithNoSSR />
      <body className={`${inter.className} h-screen flex flex-col`}>
        <UserProvider>
          <Nav />
          <main className="grow">{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
