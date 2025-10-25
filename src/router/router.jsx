// router.jsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ADHDTest from "../components/ADHDTest";
import Login from '../pages/auth/Login';
import AIChat from '../components/AIChat';
import MainDashboard from '../components/MainDashboard';
import MemoryGame from '../components/game';


const Home = React.lazy(() => import("../pages/home/Home"));
const About = React.lazy(() => import("../pages/about/About"));
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
                path:"/adhd-test",
                element:<ADHDTest/>
            },
            {
                path:"/login",
                element:<Login/>
            },
            // NEW ROUTES
          
            {
              path: '/dashboard',
              element: <PrivateRouter><MainDashboard /></PrivateRouter>
            },
            {
              path: '/chat',
              element: <PrivateRouter><AIChat /></PrivateRouter>
            },
            {
              path: '/games',
              element: <PrivateRouter><MemoryGame /></PrivateRouter>
            },

            
        ]
    }
])

export default router;