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
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { UserIcon, LogOutIcon } from "lucide-react";

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
          iQuiz
        </Link>
        <Link
          href={user ? "/dashboard" : "/"}
          className="block md:hidden text-xl font-semibold"
        >
          IQ
        </Link>
      </div>
      <div>
        {!loading ? (
          <div>Loading...</div>
        ) : user ? (
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="font-semibold text-gray-900 hover:text-gray-700 dark:text-gray-50 dark:hover:text-gray-300"
              prefetch={false}
            >
              Quizboard
            </Link>
            <Link
              href="/generate-quiz"
              className="font-semibold text-gray-900 hover:text-gray-700 dark:text-gray-50 dark:hover:text-gray-300"
              prefetch={false}
            >
              Generate
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Image
                    src={user?.avatar_url}
                    width="32"
                    height="32"
                    className="rounded-full"
                    alt="Avatar"
                  />
                  <span className="sr-only">Toggle user menu</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56">
                <DropdownMenuItem onClick={() => onSignOut()}>
                  <LogOutIcon className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
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
