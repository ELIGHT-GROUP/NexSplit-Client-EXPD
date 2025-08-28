// AuthContext.tsx
import { useSecureStore } from "@/hooks/useSecureStore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserProfile } from "@/constants/user-api-types";

type AuthContextType = {
  token: string | null;
  user: UserProfile | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: UserProfile) => void;
  clearUser: () => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  user: null,
  login: async () => {},
  logout: async () => {},
  setUser: () => {},
  clearUser: () => {},
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { value, setSecureValue, deleteValue, getValue } =
    useSecureStore("refreshToken");
  const [loading, setLoading] = useState(true);
  const [user, setUserState] = useState<UserProfile | null>(null);

  useEffect(() => {
    (async () => {
      await getValue();
      setLoading(false);
    })();
  }, [getValue]);

  const login = async (token: string) => {
    await setSecureValue(token);
  };

  const logout = async () => {
    await deleteValue();
    setUserState(null); // Clear user data on logout
  };

  const setUser = (userData: UserProfile) => {
    setUserState(userData);
  };

  const clearUser = () => {
    setUserState(null);
  };

  return (
    <AuthContext.Provider
      value={{
        token: value,
        user,
        login,
        logout,
        setUser,
        clearUser,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
