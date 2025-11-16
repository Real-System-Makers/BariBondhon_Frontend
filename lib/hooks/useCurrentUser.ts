"use client";

import { useEffect, useCallback } from "react";
import { useAuthStore } from "../stores/auth.store";
import { getCurrentUserAction } from "../actions/auth.actions";

export function useCurrentUser() {
  const { user, isAuthenticated, isLoading, setUser, clearUser, setLoading } =
    useAuthStore();

  const fetchUser = useCallback(async () => {
    setLoading(true);

    try {
      const response = await getCurrentUserAction();

      if (response.success && response.data) {
        setUser(response.data);
      } else {
        clearUser();
      }
    } catch {
      clearUser();
    } finally {
      setLoading(false);
    }
  }, [setUser, clearUser, setLoading]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return {
    user,
    isAuthenticated,
    isLoading,
    refetch: fetchUser,
  };
}
