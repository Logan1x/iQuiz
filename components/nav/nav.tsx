"use client";
import React, { useEffect } from "react";
import { useGetUser } from "@/contexts/user";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/config/supabaseConfig";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

const Nav: React.FC = () => {
  const router = useRouter();
  const { user, onSignOut } = useGetUser();

  // useEffect(() => {
  //   if (user) {
  //     router.push("/dashboard");
  //   } else {
  //     router.push("/");
  //   }
  // }, [user, router]);

  return (
    <nav className="h-16 border-b-2 flex items-center justify-between container mx-auto px-6 py-1 flex-0">
      <div className="px-4">
        <Link href="/" className="text-xl font-semibold">
          IntelliQuiz
        </Link>
      </div>
      <div>
        {user ? (
          <div className="gap-2 flex items-center">
            <Link href="/generate-quiz" className="text-base hover:underline">
              Generate Quiz
            </Link>
            <Link href="/dashboard" className="text-base hover:underline">
              Dashboard
            </Link>
          </div>
        ) : null}
      </div>
      <div>
        {user ? (
          <div className="flex gap-2">
            <div className="rounded-full h-10 w-10">
              <Image
                className="rounded-full object-cover w-full h-full"
                height={8}
                width={8}
                alt="profile"
                src={user?.avatar_url}
                unoptimized
              />
            </div>
            <button
              className="text-red-400 cursor-pointer font-semibold text-base hover:underline"
              onClick={() => onSignOut()}
            >
              Logout
            </button>
          </div>
        ) : (
          <Auth
            supabaseClient={supabase}
            providers={["github"]}
            appearance={{ theme: ThemeSupa }}
            onlyThirdPartyProviders
          />
        )}
      </div>
    </nav>
  );
};

export default Nav;
