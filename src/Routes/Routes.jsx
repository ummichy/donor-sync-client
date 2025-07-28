import {
  createBrowserRouter
} from "react-router";
import MainLayout from "../Layouts/MainLayout";
import Home from "../Pages/Home";
import DonationRequests from "../Pages/DonationRequests";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import PrivateRoute from "./PrivateRoute";
import FundingLinks from "../Pages/FundingLinks";
import Blog from "../Pages/Blog";

const router = createBrowserRouter([
  
  {
    path: "/",
    element: <MainLayout></MainLayout> ,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "donation-requests",
        element: <DonationRequests />,
      },
 
      {
        path: "login",
        
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "blog",
        element: <Blog />,
      },
      {
        path: "funding-links",
        element: <PrivateRoute>
   <FundingLinks></FundingLinks>
        </PrivateRoute>,
      },
      
      
    ],
  },
  
  
]);
export default router;