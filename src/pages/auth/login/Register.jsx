import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../../../redux/features/auth/authApi";
import { useDispatch } from "react-redux";
import { setUser } from "../../../redux/features/auth/authSlice";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [registerUser, { isLoading }] = useRegisterUserMutation();

  const handleRegister = async (e) => {
    e.preventDefault();
    setMessage(""); // Clear previous messages
    
    const data = {
      username,
      email,
      password,
    };

    try {
      const response = await registerUser(data).unwrap();
      
      // Store token in localStorage
      if (response.token) {
        localStorage.setItem("token", response.token);
      }
      
      // Store user in Redux
      if (response.user) {
        dispatch(setUser({ user: response.user }));
      }
      
      alert("Registration Successful!");
      navigate("/login"); // or navigate to "/" if you want auto-login
    } catch (error) {
      console.error("Registration error:", error);
      
      // Better error message handling
      const errorMessage = error?.data?.message || error?.message || "Registration Failed. Please try again.";
      setMessage(errorMessage);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen dark:bg-gray-800 px-4 sm:px-6 lg:px-8">
      <div className="max-w-sm w-full bg-white dark:bg-gray-900 shadow-lg rounded-lg p-8 mt-10 md:mt-0">
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800 dark:text-white">
          Create Your Account
        </h2>
        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            minLength="6"
            className="w-full px-4 py-3 rounded-lg bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500"
          />
          {message && <p className="text-red-500 text-center text-sm">{message}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="text-center text-gray-600 dark:text-gray-300 mt-6">
          Already have an account?{" "}
          <Link to={"/login"} className="text-pink-600 dark:text-pink-400 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;