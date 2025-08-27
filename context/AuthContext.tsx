// AuthContext.tsx
import { useSecureStore } from "@/hooks/useSecureStore";
import React, { createContext, useContext, useEffect, useState } from "react";

type AuthContextType = {
  token: string | null;
  login: (token: string) => Promise<void>;
  logout: () => Promise<void>;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  token: null,
  login: async () => {},
  logout: async () => {},
  loading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { value, setSecureValue, deleteValue, getValue } =
    useSecureStore("refreshToken");
  const [loading, setLoading] = useState(true);

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
  };

  return (
    <AuthContext.Provider value={{ token: value, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
