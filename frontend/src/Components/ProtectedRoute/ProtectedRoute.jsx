import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext.jsx";

export default function ProtectedRoute({ children }) {

  const { userToken } = useContext(UserContext);

  if (!userToken) {
    return <Navigate to="/guestprotected" replace/>;
  }

  return children;
}