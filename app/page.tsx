"use client";

import Link from "next/link";
import { supabase } from "@/config/supabaseConfig";
import { useGetUser } from "@/contexts/user";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function Home() {
  const { user } = useGetUser();
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-65px)]">
      <div className="absolute inset-0 -z-10 h-full w-full bg-white [background:radial-gradient(125%_125%_at_50%_10%,#fff_40%,#93c5fd_100%)]"></div>
      <div className="flex items-center justify-center">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr] lg:gap-12 xl:grid-cols-[1fr] justify-center">
              <div className="flex flex-col justify-center space-y-4 text-center">
                <div className="space-y-2">
                  <h1 className="text-3xl font-extrabold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Unleash Your Knowledge with iQuiz
                  </h1>
                  <p className="mx-auto max-w-[600px] text-gray-500 md:text-xl dark:text-gray-400 font-medium">
                    iQuiz is an AI-powered quiz generator that creates engaging
                    and personalized quizzes to help you learn and test your
                    knowledge.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row justify-center">
                  {user ? (
                    <Link
                      href="/generate-quiz"
                      className="inline-flex h-10 items-center justify-center rounded-md bg-gray-900 px-8 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
                      prefetch={false}
                    >
                      Generate Quiz
                    </Link>
                  ) : (
                    <Auth
                      supabaseClient={supabase}
                      providers={["github"]}
                      appearance={{ theme: ThemeSupa }}
                      onlyThirdPartyProviders
                      redirectTo={global?.window && window.location.origin}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
