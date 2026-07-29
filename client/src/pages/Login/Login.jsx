import "./Login.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useAdmin } from "../../context/AdminContext";
import { useAuth } from "../../context/AuthContext";

function Login() {
  const navigate = useNavigate();

  const { admins } = useAdmin();
  const { login } = useAuth();
  

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log(admins);
    if (email.trim() === "" || password.trim() === "") {
      alert("Please enter Email and Password");
      return;
    }

    const user = admins.find(
      (admin) =>
        admin.email.toLowerCase() ===
          email.trim().toLowerCase() &&
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

    // Save Logged In User
    login(user);

    alert(`Welcome ${user.name}`);

    navigate("/dashboard");
  };

  return (
    <div className="login-page">
      <div className="login-box">
        <h1>Company Management System</h1>

        <p>Sign in to continue</p>

        <input
          type="email"
          placeholder="Email Address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleLogin();
            }
          }}
        />

        <button onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
}

export default Login;