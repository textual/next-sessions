"use client";
// contexts/AuthContext.js

import {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
} from "react";

const AuthContext = createContext();
import { apiInstance } from "@/lib/axios";

export const AuthProvider = ({ children, initialAuthState }) => {
  const [loading, setLoading] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState();

  const [user, setUser] = useState(undefined);

  const logOutUser = () => {
    console.log("clear user");
    setUser(null);
    console.log("set no longer authenticated");
    setIsAuthenticated(false);
    return true;
  };
  const setLoggedInUser = (user) => {
    console.log("set user to", user);
    setUser(user);
    setIsAuthenticated(true);
  };
  const checkUser = async () => {
    try {
      console.log("ui checking user");
      const result = await apiInstance.get("/api/auth/check");
      setUser(result.data.user);
      setIsAuthenticated(Boolean(result.data.user));
    } catch (error) {
      console.log("authprovider check user ", error);
    }
  };
  useEffect(() => {
    checkUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, user, setLoggedInUser, logOutUser, checkUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
