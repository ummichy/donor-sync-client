import {
    createBrowserRouter,
    RouterProvider,
} from "react-router";
// import MyLayouts from "../Layouts/MyLayouts";
import Register from "../Pages/Register";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Profile from "../Pages/Profile";
import DashboardLayout from "../Layouts/DashboardLayout";
// import DashboardHome from "../components/DashboardHome";
import CreateDonationReq from "../Pages/CreateDonationReq";
// import MyDonationRequest from "../Pages/MyDonationRequest";
import EditDonor from "../Pages/EditDonor";
import ViewDetails from "../Pages/ViewDetails";
// import TotalUser from "../components/TotalUser";
import AllUsers from "../Pages/AllUsers";
// import AllDonation from "../Pages/Alldonation";
import Blogs from "../Pages/Blogs";
import ContentManagement from "../Pages/ContentManagement";
import AddBlog from "../Pages/AddBlog";
import SearchDonor from "../Pages/SearchDonor";
import BloodDonationReq from "../Pages/BloodDonationReq";
import BloodReqDetails from "../Pages/BloodReqDetails";
import Funding from "../Pages/Funding";
import PrivateRoute from "./PrivateRoute";
import DashboardHome from "../Components/DashBoardHome";
import TotalUser from "../Components/TotalUser";
import AllDonation from "../Pages/AllDonation";
import MyLayouts from "../Layouts/MainLayouts";
import MyDonationRequest from "../Pages/MyDonationRequset";
import MissionSection from "../Pages/MissionSection";
import Contact from "../Components/Contact";
import FAQSection from "../components/FAQSection";
import PrivacyPolicy from "../components/PrivacyPolicy";
import TermsAndConditions from "../components/TermsAndConditions";



const router = createBrowserRouter([
    {
        path: "/",
        Component: MyLayouts,
        children: [
            {
                index: true,
                Component: Home,
            },

            

            {
                path: "register",
                Component: Register,
            },
            {
                path: "login",
                Component: Login,
            },
            {
                path:'all-users',
                Component:AllUsers,
            },
            {
                path:'blogs',
                Component:Blogs,
            },
            {
                path:"search",
                Component:SearchDonor,
            },
            {
                path:"Blood-req",
                element:(
                    <PrivateRoute>
                        <BloodDonationReq></BloodDonationReq>
                    </PrivateRoute>
                ),
            },
            {
                path:"about",
                element:<MissionSection></MissionSection>,
            },
            {
                path:"contact",
                element:<Contact></Contact>,
            },
            {
                path:"terms",
                element:<TermsAndConditions></TermsAndConditions> ,
            },
            {
                path:"privacy",
                element: <PrivacyPolicy></PrivacyPolicy> ,
            },
            {
                path:"faq",
                element:<FAQSection></FAQSection>,
            },
            
            {
                path: "donation-details/:id",
                Component: ViewDetails,
            },
            {
                path:"blood-req-d/:id",
                Component:BloodReqDetails,
            },
            {
                path:"funding",
                // Component:Funding,
                element:(
                    <PrivateRoute>
                        <Funding></Funding>
                    </PrivateRoute>
                ),
            },
            
            
        ]

    },
    {
        // path: 'dashboard',
        // Component: DashboardLayout,
        path:'dashboard',
        element:(
            <PrivateRoute>
                <DashboardLayout></DashboardLayout>
            </PrivateRoute>
        ),
        children: [
            {
                index: true,
                Component: DashboardHome,

            },

            {
                path: 'profile',
                Component: Profile,
            },
            {

                path: "create-donation-request",
                Component: CreateDonationReq,

            },
            {
                path: "edit-donation/:id", 
                Component: EditDonor,
            },
            {
                path: "donation-details/:id",
                Component: ViewDetails,
            },
            {

                path: "my-donations",
                Component: MyDonationRequest,

            },
            {
                path:'total',
                Component:TotalUser,
            },
            {
                path:'all-users',
                Component:AllUsers,
            },
            {
                path:'all-donations',
                Component:AllDonation,
            },
            {
                path:'content-management',
                Component:ContentManagement,
            },
            {
                path:"add-blg",
                Component:AddBlog,
            }
            

        ]
    },





]);

export default router;