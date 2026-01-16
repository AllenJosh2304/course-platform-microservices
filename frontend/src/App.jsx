import { useState, useEffect } from "react";
import { isAuthenticated } from "./utils/auth";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";
import Register from "./components/Register";

export default function App() {
  const [view, setView] = useState("login"); // login | register | dashboard

  useEffect(() => {
    if (isAuthenticated()) {
      setView("dashboard");
    }
  }, []);

  if (view === "dashboard") {
    return <Dashboard onLogout={() => setView("login")} />;
  }

  if (view === "register") {
    return <Register onSwitchToLogin={() => setView("login")} />;
  }

  return (
    <Login
      onLoginSuccess={() => setView("dashboard")}
      onSwitchToRegister={() => setView("register")}
    />
  );
}
