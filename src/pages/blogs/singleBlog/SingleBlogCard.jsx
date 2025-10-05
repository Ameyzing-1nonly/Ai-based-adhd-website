import { useSelector } from "react-redux";
import { formatDate } from "../../../utils/formatDate";
import edjsHTML from 'editorjs-html';

const edjsParser = edjsHTML();

const SingleBlogCard = ({ blog }) => {
  const {user} = useSelector((state) => state.auth);
  const { title, createdAt, content, description, author, coverImg, category, rating } = blog || {};

  console.log("Blog data received in SingleBlogCard:", JSON.stringify(blog, null, 2));

  let htmlContent = '';

  if (content && content.blocks && Array.isArray(content.blocks) && content.blocks.length > 0) {
    try {
      htmlContent = edjsParser.parse(content).join("");
    } catch (error) {
      console.error("Error parsing content:", error);
      htmlContent = '<p>Error parsing content</p>';
    }
  } else {
    console.warn("Invalid or empty content structure");
    htmlContent = '<p>No valid content available</p>';
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-8 mt-8">
      <h1 className="md:text-4xl text-3xl font-medium mb-4 text-gray-900 dark:text-white">{title}</h1>
      <p className="mb-6 text-gray-600 dark:text-gray-300">
        {formatDate(createdAt)} by <span className="text-pink-500">{author?.username || user?.username || "Unknown author"}</span>
      </p>
      {coverImg && <img src={coverImg} alt="cover img" className="w-full md:h-[520px] object-cover" />}
      {description && (
        <div className="mt-4 mb-6 text-gray-700 dark:text-gray-300">
          <h2 className="text-2xl font-medium mb-2">Description</h2>
          <p>{description}</p>
        </div>
      )}
      <div className="mt-8 prose dark:prose-invert max-w-none text-gray-600 dark:text-gray-300">
        <div dangerouslySetInnerHTML={{ __html: htmlContent }} className="space-y-3 editorjsdiv" />
      </div>
      <div className="mt-6">
        <span className="text-lg font-medium text-pink-600 dark:text-pink-500">Category: </span>
        <span className="dark:text-gray-200">{category}</span>
      </div>
      <div className="mt-2">
        <span className="text-lg font-medium text-pink-600 dark:text-pink-500">Rating: </span>
        <span className="dark:text-gray-200">{rating} (based on 1,000 reviews)</span>
      </div>
    </div>
  );
};

export default SingleBlogCard;