import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ADHDTest from "../components/ADHDTest";
import Login from '../pages/auth/Login'; // ← Uncomment this line
const Home = React.lazy(() => import("../pages/home/Home"));
const About = React.lazy(() => import("../pages/about/About"));
const PrivacyPolicy = React.lazy(() => import("../pages/privacy-policy/PrivacyPolicy"));
const App = React.lazy(() => import("../App"));
const PrivateRouter = React.lazy(() => import("../router/PrivateRouter"));



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
                path:"/Login",
                element:<Login/>
            },
            

            

            
        ]
    }
])

export default router;