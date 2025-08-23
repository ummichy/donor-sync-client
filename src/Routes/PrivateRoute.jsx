// src/routes/PrivateRoute.jsx
// import { useContext } from "react";
// import { Navigate, Outlet, useLocation } from "react-router";
// import { AuthContext } from "../provider/AuthProvider";
// // import { AuthContext } from "../provider/AuthProvider";

// const PrivateRoute = () => {
//   const { user, loading } = useContext(AuthContext);
//   const location = useLocation();

//   // Show a spinner / skeleton while Firebase figures out who the user is
//   if (loading) {
//     return (
//       <div className="flex items-center justify-center h-screen">
//         <span className="loading loading-spinner loading-lg text-red-600" />
//       </div>
//     );
//   }

//   // If no user, kick them to /login and remember where they tried to go
//   if (!user) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }

//   // Otherwise, render whatever child route was matched
//   return ;
// };

// export default PrivateRoute;

import { useContext } from "react";
import { Navigate, useLocation } from "react-router";
import { AuthContext } from "../provider/AuthProvider";
// import { AuthContext } from "../Provider/AuthProvider";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  if (loading) {
    return (
      <p className="text-center pt-40">
        <span className="loading loading-bars loading-xl"></span>
      </p>
    );
  }

  return user ? (
    children
  ) : (
    <Navigate to="/login" state={{ from: location.pathname }} replace />
  );
};

export default PrivateRoute;
