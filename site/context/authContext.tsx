import {
  onIdTokenChanged,
  getIdTokenResult,
  onAuthStateChanged,
} from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import React, { useState, useEffect, useContext, createContext } from "react";
import { auth, firestore } from "../config/firebase";
import { AuthServices } from "../services/auth.service";

interface User {
  username: string;
  photo: string;
  id: string;
  subscription: any;
  role: any;
}

interface ContextProps {
  loading?: boolean;
  user?: object;
  logout?: () => void;
  reloadAuth?: () => void;
  setLoading?: () => void;
  setUser?: () => void;
}

export const authContext = createContext<ContextProps>({});

export const AuthProvider = ({ children }: any) => {
  const auth: any = useProvideAuth();

  return (
    <authContext.Provider
      value={{
        user: auth.user,
        loading: auth.loading,
        logout: auth.logout,
        reloadAuth: auth.reloadAuth,
        setUser: auth.setUser,
      }}
    >
      {children}
    </authContext.Provider>
  );
};
export const useAuth = () => {
  return useContext(authContext);
};

export const handleCancelSubscription = ({ userId }: any) => {
  return updateDoc(doc(firestore, "subscriptions", userId), {
    status: "expired",
  });
};

function useProvideAuth() {
  const [user, setUser] = useState<User>();
  const [loading, setLoading] = useState(true);
  const setCurrentUser = async (currentUser: any) => {
    if (currentUser && currentUser.uid) {
      const claims: any = currentUser
        ? await getIdTokenResult(currentUser).then((res) => res.claims)
        : null;

      if (claims?.subscription) {
        const expire = new Date(claims?.subscription?.expired);
        const now = new Date();

        if (expire < now) {
          handleCancelSubscription({ userId: auth.currentUser.uid }).then(
            (e) => {
              reloadAuth();
            }
          );
        }
      }

      const user = {
        username: currentUser.displayName || currentUser.email.split("@")[0],
        phone: currentUser.phoneNumber,
        photo: currentUser.photoURL,
        id: currentUser.uid,
        subscription: claims?.subscription?.status || "pro",
        role: claims.role || "user",
      };
      setUser(user);
      setLoading(false);
    } else {
      setLoading(false);
    }
  };

  const logout = () => {
    return new AuthServices().logout().then((e) => {
      setUser(undefined);
    });
  };

  const reloadAuth = async () => {
    await auth.currentUser.getIdToken(true);
  };

  useEffect(() => {
    const unsubscribe = onIdTokenChanged(auth, (d) => setCurrentUser(d));
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
    setUser: setUser,
    setLoading,
    logout,
    reloadAuth,
  };
}
