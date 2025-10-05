import { NavLink } from "react-router-dom";
import AdminImg from "../../assets/admin.png";
import { useLogOutUserMutation } from "../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/features/auth/authSlice";

const AdminNavigation = () => {
  const [logoutUser] = useLogOutUserMutation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
    } catch (error) {
      console.log(error, "failed to logout");
    }
  };

  return (
    <div className="space-y-5 p-8 md:h-[calc(100vh-98px)] flex flex-col justify-between bg-white text-black dark:bg-gray-800 text-black dark:text-white">
      <div>
        {/* Header Part */}
        <div className="mb-5">
          <img src={AdminImg} alt="Admin" className="size-14" />
          <p className="font-semibold">Admin</p>
        </div>
        <hr className="border-gray-300 dark:border-gray-700" />
        <ul className="space-y-5 pt-5">
          <li>
            <NavLink
              to={"/dashboard"}
              end
              className={({ isActive }) =>
                `block ${
                  isActive
                    ? "text-pink-600 dark:text-pink-400 font-bold"
                    : "text-black dark:text-gray-300"
                }`
              }
            >
              Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/add-new-post"}
              className={({ isActive }) =>
                `block ${
                  isActive
                    ? "text-pink-600 dark:text-pink-400 font-bold"
                    : "text-black dark:text-gray-300"
                }`
              }
            >
              New Post
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/manage-items"}
              className={({ isActive }) =>
                `block ${
                  isActive
                    ? "text-pink-600 dark:text-pink-400 font-bold"
                    : "text-black dark:text-gray-300"
                }`
              }
            >
              Manage Items
            </NavLink>
          </li>
          <li>
            <NavLink
              to={"/dashboard/users"}
              className={({ isActive }) =>
                `block ${
                  isActive
                    ? "text-pink-600 dark:text-pink-400 font-bold"
                    : "text-black dark:text-gray-300"
                }`
              }
            >
              Users
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="mb-3">
        <hr className="border-gray-300 dark:border-gray-700 mb-3" />
        <button
          onClick={handleLogout}
          className="text-white bg-pink-500 dark:bg-pink-700 font-medium px-5 py-1 rounded-sm"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default AdminNavigation;
