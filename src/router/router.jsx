import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ADHDTest from "../components/ADHDTest";
const Home = React.lazy(() => import("../pages/home/Home"));
const About = React.lazy(() => import("../pages/about/About"));
const PrivacyPolicy = React.lazy(() => import("../pages/privacy-policy/PrivacyPolicy"));
const SingleBlog = React.lazy(() => import("../pages/blogs/singleBlog/SingleBlog"));
const Login = React.lazy(() => import("../pages/auth/login/Login"));
const Register = React.lazy(() => import("../pages/auth/login/Register"));
const AdminLayout = React.lazy(() => import("../pages/admin/AdminLayout"));
const Dashboard = React.lazy(() => import("../pages/admin/dashboard/Dashboard"));
const AddPost = React.lazy(() => import("../pages/admin/post/AddPost"));
const ManagePost = React.lazy(() => import("../pages/admin/post/ManagePost"));
const ManageUser = React.lazy(() => import("../pages/admin/user/ManageUser"));
const UpdatePost = React.lazy(() => import("../pages/admin/post/UpdatePost"));
const App = React.lazy(() => import("../App"));
const PrivateRouter = React.lazy(() => import("../router/PrivateRouter"));

// Import Dashboard components
const Adhd_Dashboard = React.lazy(() => import("../pages/Dashboards/Adhd_Dashboard"));
const Parents_Dashboard = React.lazy(() => import("../pages/Dashboards/Parents_Dashboard"));

const router = createBrowserRouter([
    {
        path:"/",
        element:<App/>,
        children:[
            {
                path:"/",
                element:<Home/>
            },

            {
                path:"/about-us",
                element:<About/>
            },
            {
                path:"/privacy-policy",
                element:<PrivacyPolicy/>
            },
            {
                path:"/adhd-test",
                element:<ADHDTest/>
            },
            {
                path:"/blog/:id",
                element:<SingleBlog/>
            },
            {
                path:"/login",
                element:<Login/>
            },
            {
                path:"/register",
                element:<Register/>
            },

            // ADHD Dashboard Route
            {
                path:"/dashboards/adhd-dashboard",
                element:<Adhd_Dashboard/>
            },

            // Parents Dashboard Route
            {
                path:"/dashboards/parents-dashboard",
                element:<Parents_Dashboard/>
            },

            {
                path:"dashboard",
                element:<PrivateRouter><AdminLayout/></PrivateRouter>, // it will be protected by the admin: Use Private Routes
                children:[
                 {
                    path:"",
                    element:<Dashboard/>
                 },
                 {
                    path:"add-new-post",
                    element:<AddPost/>
                 },
                 {
                    path:"manage-items",
                    element:<ManagePost/>
                 },
                 {
                    path:"users",
                    element:<ManageUser/>
                 },
                 {
                    path:"update-items/:id",
                    element:<UpdatePost/>
                 }
                ]
            },
        ]
    }
])

export default router;