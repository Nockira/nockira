import axios from "axios";
import { useRouter } from "next/router";
import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  FC,
} from "react";
import { AuthServices } from "../services/auth.service";

interface User {
  username: string;
  email: string;
  photo: string;
  id: string;
  roles: any;
}

interface ContextProps {
  loading?: boolean;
  user?: object;
  logout?: () => void;
  handleLogin?: any;
  reloadAuth?: () => void;
  setLoading?: () => void;
  setCurrentUser?: any;
  setUser?: any;
}

export const authContext = createContext<ContextProps>({});

export const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();

  return (
    <authContext.Provider
      value={{
        user: auth.user,
        loading: auth.loading,
        logout: auth.logout,
        reloadAuth: auth.reloadAuth,
        setUser: auth.setUser,
        setCurrentUser: auth.setCurrentUser,
        handleLogin: auth.handleLogin,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(authContext);
};

function useProvideAuth() {
  const [user, setUser] = useState<any>();
  const [loading, setLoading] = useState(true);

  const logout = async () => {
    await new AuthServices().logout().then(() => {
      setLoading(false);
      setUser(undefined);
      localStorage.clear();
    });
  };

  const reloadAuth = async () => {
    await new AuthServices()
      .getCurrentUser({ fresh: true })
      .then(({ data }) => {
        localStorage.setItem("token", data.access_token);
        setCurrentUser(data);
      })
      .catch((e) => {
        setLoading(false);
        setUser(undefined);
      });
  };

  const setCurrentUser = async (data) => {
    setUser({
      ...data,
      email: data.email,
      id: data.id,
      photo: data.photo,
      username: data.username,
      providers: ["password"],
      roles: data.roles.length === 0 ? ["user"] : data.roles,
    });
    setLoading(false);
  };

  const getCurrentUser = async () => {
    await new AuthServices()
      .getCurrentUser({})
      .then(({ data }) => {
        setCurrentUser(data);
      })
      .catch((e) => {
        setLoading(false);
        // logout();
        setUser(undefined);
      });
  };

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getCurrentUser();
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (data) => {
    setCurrentUser(data);
    localStorage.setItem("token", data.access_token);
  };

  return {
    user: {
      username: "ntwali edson",
      email: "ntwaliedson9@gmail.com",
      id: "32",
    },
    loading,
    setLoading,
    setCurrentUser,
    logout,
    setUser,
    reloadAuth,
    handleLogin,
  };
}
