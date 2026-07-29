import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function ProtectedRoute({
  children,
  permission,
}) {
  const { currentUser } = useAuth();

  // Login नाही
  if (!currentUser) {
    return <Navigate to="/" replace />;
  }

  // Super Admin ला सर्व access
  if (currentUser.role === "Super Admin") {
    return children;
  }

  // Permission Check
  if (
    permission &&
    !currentUser.permissions?.[permission]
  ) {
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          background: "#020617",
          color: "white",
          fontSize: "30px",
          fontWeight: "bold",
        }}
      >
        ❌ Access Denied
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;