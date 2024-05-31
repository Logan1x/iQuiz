"use client";

import Link from "next/link";
import { supabase } from "@/config/supabaseConfig";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  supabase.auth.onAuthStateChange(async (event) => {
    if (event == "SIGNED_IN") {
      // router.push("/dashboard");
    }
  });

  return (
    <section className="flex flex-col items-center justify-start p-24 gap-2">
      <h1 className="text-4xl">IntelliQuiz</h1>
      <h2 className="text-lg">Let’s begin the adventure</h2>
      <Link
        className="text-xl my-2 border px-4 py-2 rounded shadow font-semibold bg-gray-700 text-gray-50 hover:bg-gray-800 hover:shadow-lg transition duration-300 ease-in-out"
        href="/generate-quiz"
      >
        Generate Quiz
      </Link>
    </section>
  );
}
