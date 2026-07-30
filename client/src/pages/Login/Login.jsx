import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAdmin } from "../../context/AdminContext";
import { useAuth } from "../../context/AuthContext";

import JayShriRam from "../../components/JayShriRam/JayShriRam";

function Login() {
  const navigate = useNavigate();

  const { admins } = useAdmin();
  const { login } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showWelcome, setShowWelcome] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (loading) return;

    if (!email.trim() || !password.trim()) {
      alert("Please enter Email and Password");
      return;
    }

    const user = admins.find(
      (admin) =>
        admin.email.toLowerCase() === email.trim().toLowerCase() &&
        admin.password === password.trim()
    );

    if (!user) {
      alert("Invalid Email or Password");
      return;
    }

    if (user.status !== "Active") {
      alert("This account is Inactive.");
      return;
    }

    setLoading(true);

    login(user);

    setShowWelcome(true);

    setTimeout(() => {
      navigate("/dashboard", { replace: true });
    }, 3000);
  };

  if (showWelcome) {
    return <JayShriRam />;
  }

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Company Management System</h1>

        <p>Sign in to continue</p>

        <input
          type="email"
          placeholder="Email Address"
          autoComplete="off"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? "Please Wait..." : "Login"}
        </button>
      </div>
    </div>
  );
}

export default Login;