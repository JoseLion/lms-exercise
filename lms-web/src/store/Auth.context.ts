import { Dispatch, SetStateAction, createContext, useContext } from "react";

export interface Account {
  email: string;
  role: "ADMIN" | "STUDENT";
}

export interface AuthCtxt {
  account?: Account;
  session?: string;
  setAccount: Dispatch<SetStateAction<Account | undefined>>;
  setSession: Dispatch<SetStateAction<string | undefined>>;
}

export const AuthContext = createContext<AuthCtxt>({
  setAccount: () => undefined,
  setSession: () => undefined,
});

export function useAuth(): AuthCtxt {
  return useContext(AuthContext);
}
