"use client";

import Link from "next/link";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/config/supabaseConfig";
import { createContext } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  supabase.auth.onAuthStateChange(async (event) => {
    if (event == "SIGNED_IN") {
      router.push("/dashboard");
    }
  });
  return (
    <section className="flex flex-col items-center justify-start p-24 gap-2">
      <h1 className="text-2xl">Welcome, Click on button below</h1>
      <Link
        className="text-xl font-semibold border-2 px-2 py-1 rounded "
        href="/generate-quiz"
      >
        Generate Quiz
      </Link>
    </section>
  );
}
