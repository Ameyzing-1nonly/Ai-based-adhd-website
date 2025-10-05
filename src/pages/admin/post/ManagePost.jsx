import { useState } from "react";
import { useFetchBlogsQuery, useDeleteBlogMutation } from "../../../redux/features/blogs/blogsApi";
import { formatDate } from "../../../utils/formatDate";
import { Link } from "react-router-dom";
import { MdModeEdit } from "react-icons/md";

const ManagePost = () => {
  const [query, setQuery] = useState({ search: "", category: "", location: "" });
  const { data: blogs = [], error, isLoading,refetch} = useFetchBlogsQuery(query);
  const [deleteBlog] = useDeleteBlogMutation();

  const handleSearch = (searchTerm) => {
    setQuery(prev => ({ ...prev, search: searchTerm }));
  };

  // const handleCategoryFilter = (category) => {
  //   setQuery(prev => ({ ...prev, category }));
  // };

  // const handleLocationFilter = (location) => {
  //   setQuery(prev => ({ ...prev, location }));
  // };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      try {
      const response=await deleteBlog(id).unwrap();
     alert(response.message)
     refetch()


        // You might want to refetch the blogs or update the local state here
      } catch (err) {
        console.error("Failed to delete the blog:", err);
      }
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <section className="py-1 bg-blueGray-50 mx-auto mr-8">
      <div className="w-full mb-12 xl:mb-0">
        <div className="relative flex flex-col min-w-0 break-words text-black dark:bg-gray-800 dark:text-gray-200 w-full mb-6 shadow-lg rounded">
          <div className="rounded-t mb-0 px-4 py-3 border-0">
            <div className="flex flex-wrap items-center">
              <div className="relative w-full px-4 max-w-full flex-grow flex-1">
                <h3 className="font-semibold text-base text-blueGray-700">All Blogs</h3>
              </div>
              <div className="relative w-full px-4 max-w-full flex-grow flex-1 text-right">
                <input
                  type="text"
                  placeholder="Search blogs..."
                  onChange={(e) => handleSearch(e.target.value)}
                  className="border rounded px-2 py-1 mr-2"
                />
                {/* <select
                  onChange={(e) => handleCategoryFilter(e.target.value)}
                  className="border rounded px-2 py-1 mr-2"
                >
                  <option value="">All Categories</option>
                  Add your category options here
                </select>
                <select
                  onChange={(e) => handleLocationFilter(e.target.value)}
                  className="border rounded px-2 py-1"
                >
                  <option value="">All Locations</option>
                  Add your location options here
                </select> */}
              </div>
            </div>
          </div>

          <div className="block w-full overflow-x-auto">
            <table className="items-center bg-transparent w-full border-collapse">
              <thead>
                <tr>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    No:
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Blog Name
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Author
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Publishing Date
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Edit or Manage
                  </th>
                  <th className="px-6 bg-blueGray-50 text-blueGray-500 align-middle border border-solid border-blueGray-100 py-3 text-xs uppercase border-l-0 border-r-0 whitespace-nowrap font-semibold text-left">
                    Delete
                  </th>
                </tr>
              </thead>

              <tbody>
                {blogs.map((blog, index) => (
                  <tr key={blog._id}>
                    <th className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4 text-left text-blueGray-700">
                      {index + 1}
                    </th>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {blog.title}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {blog.author.email}
                    </td>
                    <td className="border-t-0 px-6 align-center border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      {formatDate(blog.createdAt)}
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <Link to={`/dashboard/update-items/${blog._id}`} className="hover:text-pink-700">
                        <span className="flex gap-1 items-center justify-center">
                          <MdModeEdit />Edit
                        </span>
                      </Link>
                    </td>
                    <td className="border-t-0 px-6 align-middle border-l-0 border-r-0 text-xs whitespace-nowrap p-4">
                      <button
                        className="bg-red-600 text-white px-2 py-1"
                        onClick={() => handleDelete(blog._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ManagePost;