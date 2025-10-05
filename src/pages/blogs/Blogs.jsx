import { useState } from "react";
import SearchBlog from "./SearchBlog";
import { Link } from "react-router-dom";
import { useFetchBlogsQuery } from "/src/redux/features/blogs/blogsApi.js";
import { formatDate } from "../../utils/formatDate";

const Blogs = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState();
  const [query, setQuery] = useState({ search: "", category: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const blogsPerPage = 9;

  // Get data using redux
  const { data: blogs = [], error, isLoading } = useFetchBlogsQuery(query);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const handleSearch = () => {
    setQuery({ search, category });
    setCurrentPage(1);
  };

  // Pagination logic
  const indexOfLastBlog = currentPage * blogsPerPage;
  const indexOfFirstBlog = indexOfLastBlog - blogsPerPage;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  const totalPages = Math.ceil(blogs.length / blogsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-white dark:bg-gray-900 text-gray-800 dark:text-white w-full py-8">
      <div className="mb-8 mx-8">
        <SearchBlog
          search={search}
          handleSearchChange={handleSearchChange}
          handleSearch={handleSearch}
        />
      </div>

      {isLoading && <div className="text-center">Loading...</div>}
      {error && <div className="text-center text-red-500">{error.toString()}</div>}

      {/* Blog Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-8">
        {currentBlogs.map((blog) => (
          <Link to={`/blog/${blog._id}`} key={blog._id} className="group">
            <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl">
              <img
                src={blog?.coverImg}
                alt={blog.title}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white group-hover:text-pink-600 dark:group-hover:text-pink-400 transition-colors duration-300">
                  {blog.title}
                </h2>
                <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">
                  {blog.description.substring(0, 70) || "No excerpt available"}
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(blog.createdAt)}
                  </span>
                  <span className="text-sm font-medium text-pink-600 dark:text-pink-400">
                    Read More
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <nav className="inline-flex rounded-md shadow">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-3 py-2 rounded-l-md border border-gray-300 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              Previous
            </button>
            {[...Array(totalPages).keys()].map((number) => (
              <button
                key={number + 1}
                onClick={() => paginate(number + 1)}
                className={`px-3 py-2 border border-gray-300 text-sm font-medium ${
                  currentPage === number + 1
                    ? "bg-pink-600 text-white"
                    : "bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700"
                }`}
              >
                {number + 1}
              </button>
            ))}
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-3 py-2 rounded-r-md border border-gray-300 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50"
            >
              Next
            </button>
          </nav>
        </div>
      )}
    </div>
  );
};

export default Blogs;