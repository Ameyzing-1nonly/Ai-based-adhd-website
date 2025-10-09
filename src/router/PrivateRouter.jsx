// PrivateRouter.jsx
import { useAuth } from "../contexts/authContext";
import { Navigate, useLocation } from "react-router-dom";
import Loading from "../components/Loading";

const PrivateRouter = ({ children }) => {
  const { userLoggedIn, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <Loading />;
  }

  if (userLoggedIn) {
    return children;
  }

  return <Navigate to={"/login"} state={{ from: location }} replace />;
};

export default PrivateRouter;