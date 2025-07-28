import { useContext } from "react";
import { Navigate } from "react-router";
import { AuthContext } from "../Provider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <p className="text-center pt-40"><span className="loading loading-bars loading-xl"></span></p>;

  return user ? children : <Navigate to="/login" />;
};

export default PrivateRoute;