import { Navigate } from "react-router-dom";

export default function AuthorizeUser({ children }) {
  const token = localStorage.getItem("userToken");

  if (!token) return <Navigate to={"/"} />;

  return children;
}
