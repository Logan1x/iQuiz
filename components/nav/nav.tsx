"use client";
import React from "react";
import { useGetUser } from "@/contexts/user";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/config/supabaseConfig";
import { useRouter } from "next/navigation";
import Link from "next/link";

type Props = {};

const Nav = (props: Props) => {
  const { user, onSignOut } = useGetUser();

  const router = useRouter();
  supabase.auth.onAuthStateChange(async (event) => {
    if (event == "SIGNED_IN") {
      router.push("/dashboard");
    }
  });

  return (
    <nav className="h-16 border-b-2 flex items-center justify-between container mx-auto px-6 py-1 flex-0">
      <div className="px-4">
        <Link href="/" className="text-xl font-semibold">
          Quiz Whiz
        </Link>
      </div>
      <div>
        {user ? (
          <div className="gap-2 flex ">
            <Link href="/generate-quiz" className="text-base hover:underline">
              Generate Quiz
            </Link>
            <Link href="/dashboard" className="text-base hover:underline">
              Dashboard
            </Link>
            <button
              className="text-base hover:underline"
              onClick={() => onSignOut()}
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <Auth
              supabaseClient={supabase}
              providers={["github"]}
              // socialLayout="horizontal"
              onlyThirdPartyProviders
            />
          </>
        )}
      </div>
    </nav>
  );
};

export default Nav;
