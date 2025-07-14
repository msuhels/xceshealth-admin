import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const AuthContext = createContext(undefined);


export function AuthProvider({ children }) {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    const cookie = Cookies.get("user_token");
    return cookie ? JSON.parse(cookie) : undefined;
  });

  const saveSession = (user) => {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    Cookies.set("user_token", JSON.stringify(user), {
      expires: expirationDate});
    setUser(user);
  };

  const removeSession = (redirectTo) => {
    Cookies.remove("user_token");
    setUser(undefined);

    if (redirectTo) {
      navigate(`/auth/sign-in?redirect=${redirectTo}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user?.token,
        saveSession,
        removeSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuthContext() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuthContext must be used within an AuthProvider");
  }
  return context;
}