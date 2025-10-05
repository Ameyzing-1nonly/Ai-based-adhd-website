import { useSelector } from "react-redux";
import { FiUsers } from "react-icons/fi";
import { FaBlog, FaRegComment } from "react-icons/fa";
import { RiAdminLine } from "react-icons/ri";
import { useState } from "react";
import { useFetchBlogsQuery } from "../../../redux/features/blogs/blogsApi";
import { useGetCommentQuery } from "../../../redux/features/comments/commentApi";
import { useGetUserQuery } from "../../../redux/features/auth/authApi";
import BlogCharts from "./BlogCharts";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  const [query, setQuery] = useState({ search: '', category: '' });
  const { data: blogs = [], error, isLoading } = useFetchBlogsQuery(query);
  const { data: comments = {} } = useGetCommentQuery();
  const { data } = useGetUserQuery();
  const users = data?.users || []; // Access the users array

  const adminCount = users.filter((user) => user.role === "admin").length;
  console.log(`Number of Admins: ${adminCount}`);
  return (
    <>
      {isLoading && <div>Loading...</div>}
      <div className="space-y-6">
        <div className="bg-gray-200 p-5">
          <h1 className="dark:text-gray-800 text-black">Hi, <span className="text-pink-600">{user?.username}</span></h1>
          <p>Welcome to the Admin Dashboard</p>
          <p className="dark:text-gray-800 text-black">
            Here You Can Manage Your ADHD's Posts, Users and Other
            Administrative Tasks.
          </p>
        </div>
        
        {/* 4 cards grid */}
        <div className="flex flex-col md:flex-row justify-center gap-8 pt-3 text-black dark:text-gray-800">
          <div className="bg-pink-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center">
            <FiUsers className="size-8 text-pink-600" />
            <p>{users.length}</p>
          </div>
          <div className="bg-blue-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center">
            <FaBlog className="size-8 text-pink-600" />
            <p>{blogs.length} Blogs</p>
          </div>
          <div className="bg-green-100 py-6 w-full rounded-sm space-y-1 flex flex-col items-center">
            <RiAdminLine className="size-8 text-pink-600" />
         
              <p>{adminCount} Admin{adminCount !== 1 ? 's' : ''}</p>

          </div>
          <div className="bg-gray-200 py-6 w-full rounded-sm space-y-1 flex flex-col items-center">
            <FaRegComment className="size-8 text-pink-600" />
            <p>{comments?.totalComment || 0} Comments</p>
          </div>
        </div>

        {/* graphs and charts */}
        <div className="pt-5 pb-5">
          <BlogCharts blogs={blogs} />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
