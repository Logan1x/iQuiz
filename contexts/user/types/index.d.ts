import { User } from "@/types/user";
import { ReactNode } from "react";

export interface UserContextType {
  user: User | null;
}

export interface UserProviderProps {
  children: ReactNode;
}
