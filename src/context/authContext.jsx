/* eslint-disable react/prop-types */
import { createContext, useContext } from "react";
import { useUserContext } from "./userContext";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const { user, setUser } = useUserContext();

  const register = () => {

    
  }

  return <AuthContext.Provider>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => useContext(AuthContext);
