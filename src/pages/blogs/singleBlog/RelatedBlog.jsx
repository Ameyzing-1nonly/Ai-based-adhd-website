import { useParams, Link } from "react-router-dom";
import { useFetchRelatedBlogsQuery } from "../../../redux/features/blogs/blogsApi";

const RelatedBlog = () => {
  const { id } = useParams();
  const { data: blogs = [], error, isLoading } = useFetchRelatedBlogsQuery(id);

  if (isLoading) return <div>Loading related blogs...</div>;
  if (error) return <div>Error loading related blogs: {error.message}</div>;

  return (
    <div>
      <h3 className="text-2xl font-medium pt-8 pb-5 p-3.5">Related Blogs</h3>
      <hr />
      {blogs.length > 0 ? (
        <div className="space-y-4 mt-5">
          {blogs.map((blog) => (
            <Link
              key={blog?._id}
              to={`/blog/${blog?._id}`}
              className="flex flex-col sm:flex-row gap-4 shadow-sm px-4 py-4 md:px-6 lg:px-8"
            >
              <div className="flex">
              <div className="sm:w-16 flex-shrink-0">
                <img
                  src={blog?.coverImg}
                  alt="cover img"
                  className="w-12 flex ring-2 h-12 ring-pink-600 object-cover "
                />
              </div>
              <div className="flex-1 ml-3">
                <h4 className="font-medium text-pink-600">
                  {blog?.title.length > 50
                    ? `${blog?.title.substring(0, 50)}...`
                    : blog?.title}
                </h4>
                <p className="dark:text-gray-400 text-sm">
                  {blog?.description.length > 50
                    ? `${blog?.description.substring(0, 50)}...`
                    : blog?.description}
                </p>
              </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="p-8 text-center">No related blogs found!</div>
      )}
    </div>
  );
};

export default RelatedBlog;
