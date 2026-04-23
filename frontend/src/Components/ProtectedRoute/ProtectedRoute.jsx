import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "../Context/UserContext.jsx";

export default function ProtectedRoute({ children }) {

  const { userToken,isLoading} = useContext(UserContext);
  if (isLoading) {
  return <p>Loading...</p>; // أو spinner
}

  if (!userToken) {
    return <Navigate to="/guestprotected" replace/>;
  }

  return children;
}