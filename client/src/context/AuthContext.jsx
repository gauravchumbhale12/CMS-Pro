import {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { useAdmin } from "./AdminContext";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const { admins } = useAdmin();

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = sessionStorage.getItem("currentUser");

    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (currentUser) {
      sessionStorage.setItem(
        "currentUser",
        JSON.stringify(currentUser)
      );
    } else {
      sessionStorage.removeItem("currentUser");
    }
  }, [currentUser]);

  // Realtime Current User Update
  useEffect(() => {
    if (!currentUser) return;

    const latestUser = admins.find(
      (admin) => admin.id === currentUser.id
    );

    if (latestUser) {
      setCurrentUser(latestUser);
    }
  }, [admins]);

  const login = (user) => {
    setCurrentUser(user);
  };

  const logout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem("currentUser");
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);