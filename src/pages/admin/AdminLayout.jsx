import { Navigate, Outlet } from "react-router-dom";
import AdminNavigation from "./AdminNavigation";
import { useSelector } from "react-redux";

const AdminLayout = () => {
    const {user} = useSelector((state)=>state.auth);
    if(!user || user.role !=='admin'){
        return <Navigate to={"/login"}/>

    }
  return (
    <div className=" bg-white text-black dark:bg-gray-800  flex flex-col md:flex-row gap-4 items-start justify-start">
      <header className="lg:w-1/5 sm:2/5 w-full mt-8">
   <AdminNavigation/>
      </header>

      <main className="p-8 text-gray-200 w-full dark:bg-gray-800">
        {/* <p>This is For admin Content</p> */}
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
