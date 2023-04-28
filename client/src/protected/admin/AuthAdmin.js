import { Navigate } from "react-router-dom";

export default function AuthAdmin({ children }) {
  const token = localStorage.getItem("adminToken");
  if (token) return <Navigate to={"/users-list"} />;

  return children;
}
