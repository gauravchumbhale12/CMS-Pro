import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaEnvelope,
  FaLock,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

import logo from "../../assets/logo-icon.png";

import { useAdmin } from "../../context/AdminContext";
import { useAuth } from "../../context/AuthContext";

import JayShriRam from "../../components/JayShriRam/JayShriRam";

function Login() {
const navigate = useNavigate();

const { admins } = useAdmin();
const { login } = useAuth();

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const [loading, setLoading] = useState(false);

const [showWelcome, setShowWelcome] =
useState(false);

const [showPassword,setShowPassword]=
useState(false);

const [rememberMe,setRememberMe]=
useState(false);

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

if(showWelcome){

return <JayShriRam/>;

}

  return (
  <div className="login-page">

    <div className="login-overlay">

      <div className="login-card">

        {/* Logo */}

        <div className="login-logo">

          <img
            src={logo}
            alt="OM-SAI"
          />

          <h2>OM-SAI</h2>

          <p>Moulds & Plastics</p>

        </div>

        {/* Heading */}

        <h1 className="login-title">
          Welcome Back
        </h1>

        <p className="login-subtitle">
          Company Management System
        </p>

        {/* Email */}

        <div className="input-group">

          <FaEnvelope className="input-icon" />

          <input
            type="email"
            placeholder="Email Address"
            autoComplete="off"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

        </div>

        {/* Password */}

        <div className="input-group">

          <FaLock className="input-icon" />

          <input
            type={
              showPassword
                ? "text"
                : "password"
            }
            placeholder="Password"
            autoComplete="off"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleLogin();
              }
            }}
          />

          <span
            className="eye-icon"
            onClick={() =>
              setShowPassword(
                !showPassword
              )
            }
          >

            {showPassword ? (
              <FaEyeSlash />
            ) : (
              <FaEye />
            )}

          </span>

        </div>

        {/* Remember */}

        <div className="login-options">

          <label>

            <input
              type="checkbox"
              checked={rememberMe}
              onChange={() =>
                setRememberMe(
                  !rememberMe
                )
              }
            />

            Remember Me

          </label>

          <span className="secure">

            Secure Login

          </span>

        </div>

        {/* Button */}

        <button
          className="login-btn"
          onClick={handleLogin}
          disabled={loading}
        >

          {loading
            ? "Signing In..."
            : "Login"}

        </button>

        <div className="login-footer">

          © 2026

          <br />

          OM-SAI Moulds & Plastics

        </div>

      </div>

    </div>

  </div>
);

}

export default Login;