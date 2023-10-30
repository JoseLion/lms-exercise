import { ReactElement, ReactNode, useMemo, useState } from "react";

import { Account, AuthContext, AuthCtxt } from "./Auth.context";

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps): ReactElement {

  const [account, setAccount] = useState<Account>();
  const [session, setSession] = useState<string>();

  const auth = useMemo((): AuthCtxt => ({
    account,
    session,
    setAccount,
    setSession,
  }), [account, session]);

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
}
