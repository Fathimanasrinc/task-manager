import { Navigate } from "react-router-dom";
import { auth } from "../services/firebase";

export function ProtectedRoute({ children }) {
  const user = auth.currentUser;

  // 🔒 not logged in → redirect to login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // ✅ logged in → allow access
  return children;
}