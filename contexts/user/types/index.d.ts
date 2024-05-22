import { User } from "@/types/user";
import { ReactNode } from "react";

export interface UserContextType {
  user: User | null;
  onSignOut: () => void;
}

export interface UserProviderProps {
  children: ReactNode;
}
