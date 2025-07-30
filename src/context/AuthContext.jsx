// src/auth/AuthContext.jsx
import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(
    localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null
  );
  const [role, setRole] = useState(localStorage.getItem("role") || null);

  // Keep localStorage in sync when state changes
  useEffect(() => {
    if (user && role) {
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", role);
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("role");
    }
  }, [user, role]);

  const login = (userObj, roleStr) => {
    setUser(userObj);
    setRole(roleStr);
  };
  const logout = () => {
    setUser(null);
    setRole(null);
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
