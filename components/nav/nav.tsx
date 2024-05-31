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
          <div className="md:gap-2 flex items-center flex-col md:flex-row">
            <Link href="/generate-quiz" className="text-base underline">
              Generate Quiz
            </Link>
            <Link href="/dashboard" className="text-base underline">
              Dashboard
            </Link>
          </div>
        ) : null}
      </div>
      <div>
        {user ? (
          <div className="flex gap-2">
            <button
              className="text-gray-600 cursor-pointer font-semibold text-base hover:underline"
              onClick={() => onSignOut()}
            >
              <svg
                fill="none"
                strokeWidth={1.5}
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                />
              </svg>
            </button>
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
