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
import DashboardLayout from "../Pages/DashboardLayout";
import DashboardHome from "../Pages/DashboardHome";
import ProfilePage from "../Pages/ProfilePage";
import MyDonationRequests from "../Pages/MyDonationRequests";
import CreateDonationRequest from "../Pages/CreateDonationRequest";
import EditDonationRequest from "../Pages/EditDonationRequest";
import DonationRequestDetails from "../Pages/DonationRequestDetails";



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
      {
        path: "dashboard",
        element: <PrivateRoute><DashboardLayout></DashboardLayout></PrivateRoute>,
        children: [
          { index: true, element: <DashboardHome /> },
          { path: "profile", element: <ProfilePage /> },
          { path: "my-donation-requests", element: <MyDonationRequests /> },
          { path: "create-donation-request", element: <CreateDonationRequest /> },
          { path: "donation-request/:id/edit", element: <EditDonationRequest /> },
          { path: "donation-request/:id", element: <DonationRequestDetails /> },
        ]
      },
      
      
    ],
  },
  
  
]);
export default router;