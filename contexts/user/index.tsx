"use client";
import { User } from "@/types/user";
import { useRouter } from "next/navigation";
import { supabase } from "@/config/supabaseConfig";
import { UserContextType, UserProviderProps } from "./types";
import React, { createContext, useContext, useEffect, useState } from "react";

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useGetUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const { data, error } = await supabase.auth.getUser();

        if (error) {
          throw error;
        }

        if (data) {
          const {
            id,
            created_at,
            user_metadata: { user_name: username, name, email, avatar_url },
          } = data.user;
          setUser({ id, email, username, created_at, avatar_url, name });
        }
      } catch (error: any) {
        console.error("Error fetching user:", error.message);
      }
    })();
  }, []);

  const onSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    router.push("/");
  };

  const contextValue: UserContextType = { user, onSignOut };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
};
