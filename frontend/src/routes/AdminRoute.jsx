import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function AdminRoute() {
  const { user, isLoggedIn } = useAuth();

  // Not logged in
  if (!isLoggedIn) {
    return <Navigate to="/admin-login" replace />;
  }

  // Logged in but not an Admin
  if (user?.role !== "Admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}

export default AdminRoute;