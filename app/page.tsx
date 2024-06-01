"use client";

import Link from "next/link";
import { supabase } from "@/config/supabaseConfig";
import { useRouter } from "next/navigation";
import { useGetUser } from "@/contexts/user";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";

export default function Home() {
  const router = useRouter();

  const { user } = useGetUser();
  return (
    <section className="flex flex-col items-center justify-start p-24 gap-2">
      <h1 className="text-4xl font-bold">IntelliQuiz</h1>
      <h2 className="text-xl">Let’s begin the adventure</h2>
      {user ? (
        <Link
          className="text-xl my-2 border px-4 py-2 rounded shadow font-semibold bg-gray-700 text-gray-50 hover:bg-gray-800 hover:shadow-lg transition duration-300 ease-in-out"
          href="/generate-quiz"
        >
          Generate Quiz
        </Link>
      ) : (
        <Auth
          supabaseClient={supabase}
          providers={["github"]}
          appearance={{ theme: ThemeSupa }}
          onlyThirdPartyProviders
          redirectTo={window.location.origin}
        />
      )}
    </section>
  );
}
