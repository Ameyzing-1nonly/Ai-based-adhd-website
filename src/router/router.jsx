// router.jsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import ADHDTest from "../components/ADHDTest";
import Login from '../pages/auth/Login';
import AIChat from '../components/AIChat';
import MainDashboard from '../components/MainDashboard';
import VoiceExtractor from '../components/VoiceExtractor';
import MemoryGame from '../components/MemoryGame';


const Home = React.lazy(() => import("../pages/home/Home"));
const About = React.lazy(() => import("../pages/about/About"));
const Dashboard = React.lazy(() => import("../pages/Dashboard/Dashboard"));
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
              path: '/voice',
              element: <PrivateRouter><VoiceExtractor /></PrivateRouter>
            },
            {
              path: '/games',
              element: <PrivateRouter><MemoryGame /></PrivateRouter>
            },
            {
              path: '/old-dashboard',
              element: <PrivateRouter><Dashboard /></PrivateRouter>
            },
            
        ]
    }
])

export default router;