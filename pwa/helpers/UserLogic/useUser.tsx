import { useEffect, useState } from "react";
import { AuthenticatedUserInterface } from "../../interfaces/UserInterface";

export async function getCurrentUser() {
  return await fetch("/api/auth/me");
}

async function getAuthenticatedUser() {
  const resp = await getCurrentUser();
  if (resp.status != 200) {
    return { authenticated: false, user: null };
  }
  let me = resp.ok ? await resp.json() : null;
  return { authenticated: resp.ok, user: me };
}

export function useUser() {
  const [user, setUser] = useState<AuthenticatedUserInterface | null>(null);
  const [isAuthenticated, setIsAutenticated] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [refetchUser, setRefetchUser] = useState<boolean>(true);

  function refetchUserNow() {
    setIsLoading(true);
    setIsAutenticated(isAuthenticated);
    setRefetchUser(!refetchUser);
  }

  useEffect(() => {
    async function getUserDetails() {
      const { authenticated, user } = await getAuthenticatedUser();
      setUser(user);
      setIsAutenticated(authenticated);
      setIsLoading(false);
      if (!authenticated) {
        return { user: null, authenticated: false };
      }
    }
    getUserDetails();
  }, [refetchUser]);

  return { user, isAuthenticated, isLoading, setUser, refetch: refetchUserNow };
}
