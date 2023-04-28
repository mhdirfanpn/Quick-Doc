import { Navigate } from "react-router-dom";

export default function AuthUser({ children }) {
  const token = localStorage.getItem("userToken");

  if (token) return <Navigate to={"/home"} />;

  return children;
}
