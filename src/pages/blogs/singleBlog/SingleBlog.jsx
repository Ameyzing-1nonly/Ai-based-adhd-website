import { useParams } from "react-router-dom";
import { useFetchBlogByIdQuery } from "../../../redux/features/blogs/blogsApi";
import SingleBlogCard from "./SingleBlogCard";
import CommentCard from "../comments/CommentCard";
import RelatedBlog from "./RelatedBlog";

const SingleBlog = () => {
  const { id } = useParams();
  const { data: blog, error, isLoading } = useFetchBlogByIdQuery(id);

  console.log("Blog data:", blog);

  return (
    <div className="text-primary bg-white dark:bg-black">
      <div>
        {isLoading && <div>Loading...</div>}
        {error && <div>Error: {error.message}</div>}
        {blog?.post ? (
          <div className="mx-8 flex flex-col lg:flex-row justify-between items-start md:gap-12 gap-8">
            <div className="lg:w-2/3 w-full">
              <SingleBlogCard blog={blog.post} />
              <div>
                {blog.comments && <CommentCard comments={blog.comments} />}
              </div>
            </div>
            <div className="bg-white dark:bg-gray-900 dark:text-gray-100 lg-w-1/3 w-full p-3 mt-8">
              <RelatedBlog />
            </div>
          </div>
        ) : (
          !isLoading && !error && <div>No blog post found</div>
        )}
      </div>
    </div>
  );
};

export default SingleBlog;
