import { createContext } from "react";
import { useUser } from "../helpers/UserLogic/useUser";
import { AuthenticatedUserInterface } from "../interfaces/UserInterface";

export interface UserContextInterface {
  user: AuthenticatedUserInterface | null;
  isAuthenticated: boolean | null;
  isLoading: boolean | null;
  refetch: () => void;
  setUser: (user: AuthenticatedUserInterface | null) => void;
}

export const UserContext = createContext<UserContextInterface>(
  {} as UserContextInterface
);
