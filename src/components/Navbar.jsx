import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import defaultImg from "../assets/default-img.jpg"
import {
  IoMenuOutline,
  IoMoonOutline,
  IoSunnyOutline,
  IoCloseOutline,
} from "react-icons/io5";
import { useLogOutUserMutation } from "../redux/features/auth/authApi";
import { logout } from "../redux/features/auth/authSlice";

const ADHDLogo = () => (
  <svg
    className="h-15 w-12"
    viewBox="0 0 48 48"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <linearGradient id="pinkGradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style={{ stopColor: "#FFC0CB", stopOpacity: 1 }} />
        <stop offset="100%" style={{ stopColor: "#FF69B4", stopOpacity: 1 }} />
      </linearGradient>
    </defs>

    <circle cx="24" cy="24" r="23" fill="url(#pinkGradient)" />

    <path
      d="M12 24 C 15 15, 20 10, 24 15 S 30 20, 36 24 C 33 30, 28 35, 24 33 S 15 28, 12 24"
      stroke="white"
      strokeWidth="1.5"
      fill="none"
    />

    <circle cx="20" cy="20" r="1.5" fill="white" />
    <circle cx="28" cy="18" r="1.5" fill="white" />
    <circle cx="24" cy="28" r="1.5" fill="white" />

    <circle cx="18" cy="22" r="2" fill="#00FFFF" />
    <rect x="28" y="26" width="3" height="3" fill="#39FF14" />
    <polygon points="30,19 31.5,21 28.5,21" fill="#9D00FF" />

    <text
      x="24"
      y="42"
      fontFamily="Arial, sans-serif"
      fontSize="8"
      fill="white"
      textAnchor="middle"
      fontWeight="bold"
    >
      ADHD
    </text>
  </svg>
);

const navList = [
  { name: "Home", path: "/" },
  { name: "About us", path: "/about-us" },
  { name: "Privacy Policy", path: "/privacy-policy" },
  { name: "ADHD Test", path: "/adhd-test" },
];

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [logoutUser] = useLogOutUserMutation();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle("dark");
  };

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  const handleLogOut = async () => {
    try {
      await logoutUser().unwrap();
      dispatch(logout());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <header className="bg-white dark:bg-gray-800 py-6 border-b dark:border-gray-700">
      <nav className="container mx-auto flex justify-between items-center px-5">
        <a href="/">
          <ADHDLogo />
        </a>
        <ul className="sm:flex hidden items-center gap-8">
          {navList.map((list, index) => (
            <li key={index}>
              <NavLink
                to={list.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-pink-600 dark:text-pink-400"
                    : "text-gray-700 dark:text-gray-300"
                }
              >
                {list.name}
              </NavLink>
            </li>
          ))}

          {user ? (
            <>
              {user.role === "user" && (
                <li className="flex items-center gap-3">
                  <img
                    src={defaultImg}
                    alt="default image"
                    className="h-8 w-8 rounded-full"
                  />
                  <button
                    onClick={handleLogOut}
                    className="bg-pink-400 px-4 py-1.5 text-white rounded-sm"
                  >
                    LogOut
                  </button>
                </li>
              )}

              {user.role === "admin" && (
                <li className="flex items-center gap-3">
                  <img
                    src={defaultImg}
                    alt="default image"
                    className="h-8 w-8 rounded-full"
                  />
                  <Link to="/dashboard">
                    <button className="bg-pink-400 px-4 py-1.5 text-white rounded-sm">
                      Dashboard
                    </button>
                  </Link>
                </li>
              )}
            </>
          ) : (
            <li>
              <NavLink
                to="/login"
                className="text-gray-700 dark:text-gray-300"
              >
                Login
              </NavLink>
            </li>
          )}

          <li>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              {isDarkMode ? (
                <IoSunnyOutline className="h-6 w-6 text-gray-300" />
              ) : (
                <IoMoonOutline className="h-6 w-6 text-gray-700" />
              )}
            </button>
          </li>
        </ul>
        <div className="flex items-center sm:hidden gap-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-700"
          >
            {isDarkMode ? (
              <IoSunnyOutline className="h-6 w-6 text-gray-300" />
            ) : (
              <IoMoonOutline className="h-6 w-6 text-gray-700" />
            )}
          </button>
          <button
            onClick={toggleMenu}
            className={`flex items-center px-3 py-4 bg-gray-100 dark:bg-gray-700 rounded text-sm text-gray-700 dark:text-gray-300 ${
              isMenuOpen ? "animate-rotate-180" : ""
            }`}
          >
            {isMenuOpen ? (
              <IoCloseOutline className="h-6 w-6" />
            ) : (
              <IoMenuOutline className="h-6 w-6" />
            )}
          </button>
        </div>
      </nav>

      {isMenuOpen && (
        <ul className="fixed top-[108px] left-0 w-full h-auto pb-8 bg-white dark:bg-gray-800 shadow-sm z-50">
          {navList.map((list, index) => (
            <li key={index} className="mt-5 px-4">
              <NavLink
                onClick={() => setIsMenuOpen(false)}
                to={list.path}
                className={({ isActive }) =>
                  isActive
                    ? "text-pink-600 dark:text-pink-400"
                    : "text-gray-700 dark:text-gray-300"
                }
              >
                {list.name}
              </NavLink>
            </li>
          ))}

          {user ? (
            <>
              <li className="mt-5 px-4 flex items-center gap-3">
                <img
                  src={defaultImg}
                  alt="default image"
                  className="h-8 w-8 rounded-full"
                />
                <span className="text-gray-700 dark:text-gray-300">
                  {user.name || "User"}
                </span>
              </li>
              {user.role === "admin" && (
                <li className="mt-5 px-4">
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="bg-pink-400 px-4 py-1.5 text-white rounded-sm inline-block"
                  >
                    Dashboard
                  </Link>
                </li>
              )}
              <li className="mt-5 px-4">
                <button
                  onClick={() => {
                    handleLogOut();
                    setIsMenuOpen(false);
                  }}
                  className="bg-pink-400 px-4 py-1.5 text-white rounded-sm"
                >
                  LogOut
                </button>
              </li>
            </>
          ) : (
            <li className="px-4 mt-5">
              <NavLink
                to="/login"
                onClick={() => setIsMenuOpen(false)}
                className="text-gray-700 dark:text-gray-300"
              >
                Login
              </NavLink>
            </li>
          )}
        </ul>
      )}
    </header>
  );
};

export default Navbar;