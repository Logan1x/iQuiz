"use client";
import React, { useEffect, useState } from "react";
import { useGetUser } from "@/contexts/user";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { supabase } from "@/config/supabaseConfig";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { MdOutlineLogout } from "react-icons/md";

const Nav: React.FC = () => {
  const router = useRouter();
  const { user, onSignOut } = useGetUser();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (user) {
      setLoading(false);
    }
  }, []);

  return (
    <nav className="h-16 border-b-2 flex items-center justify-between container mx-auto px-6 py-1 flex-0">
      <div className="px-4">
        <Link
          href={user ? "/dashboard" : "/"}
          className="hidden md:block text-xl font-semibold"
        >
          IntelliQuiz
        </Link>
        <Link
          href={user ? "/dashboard" : "/"}
          className="block md:hidden text-xl font-semibold"
        >
          IQ
        </Link>
      </div>
      <div>
        {user ? (
          <div className="gap-2 flex items-center md:flex-row">
            <Link href="/dashboard" className="text-base">
              Quizboard
            </Link>
            <Link href="/generate-quiz" className="text-base">
              Generate
            </Link>
          </div>
        ) : null}
      </div>
      <div>
        {!loading ? (
          <div>Loading...</div>
        ) : user ? (
          <div className="flex gap-2">
            <button
              className="text-gray-600 cursor-pointer font-semibold text-base hover:underline"
              onClick={() => onSignOut()}
            >
              <MdOutlineLogout size={24} />
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
            redirectTo={global?.window && window.location.origin}
          />
        )}
      </div>
    </nav>
  );
};

export default Nav;
