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
      <head>
        <title>iQuiz</title>
        <meta name="title" content="iQuiz" />
        <meta name="description" content="generate quizzes in seconds" />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://iquiz-ai.vercel.app/" />
        <meta property="og:title" content="iQuiz" />
        <meta property="og:description" content="generate quizzes in seconds" />
        <meta property="og:image" content="https://i.imgur.com/U3xFyV9.png" />

        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://iquiz-ai.vercel.app/" />
        <meta property="twitter:title" content="iQuiz" />
        <meta
          property="twitter:description"
          content="generate quizzes in seconds"
        />
        <meta
          property="twitter:image"
          content="https://i.imgur.com/U3xFyV9.png"
        />
      </head>
      <CrispWithNoSSR />
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <UserProvider>
          <Nav />
          <main className="grow">{children}</main>
        </UserProvider>
      </body>
    </html>
  );
}
