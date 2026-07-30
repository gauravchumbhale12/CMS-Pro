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

  // Current Logged In User
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = sessionStorage.getItem("currentUser");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Save User in Session
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

  // Realtime Sync with Firestore
  useEffect(() => {
    if (!currentUser) return;

    const latestUser = admins.find(
      (admin) => admin.id === currentUser.id
    );

    if (latestUser) {
      setCurrentUser(latestUser);
    }
  }, [admins, currentUser]);

  // Login
  const login = (user) => {
    setCurrentUser(user);
  };

  // Logout
  const logout = () => {
    setCurrentUser(null);
    sessionStorage.removeItem("currentUser");
  };

  // Refresh Current User
  const refreshCurrentUser = () => {
    if (!currentUser) return;

    const latestUser = admins.find(
      (admin) => admin.id === currentUser.id
    );

    if (latestUser) {
      setCurrentUser(latestUser);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setCurrentUser,
        login,
        logout,
        refreshCurrentUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);