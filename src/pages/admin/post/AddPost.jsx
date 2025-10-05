import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import List from "@editorjs/list";
import Header from "@editorjs/header";
import EditorJS from "@editorjs/editorjs";
import { useNavigate } from "react-router-dom";
import { usePostBlogMutation } from "../../../redux/features/blogs/blogsApi";
import edjsHTML from 'editorjs-html';

const edjsParser = edjsHTML();

const AddPost = () => {
  const editorRef = useRef(null);
  const [title, setTitle] = useState("");
  const [coverImg, setCoverImg] = useState(null);
  const [metaDescription, setMetaDescription] = useState("");
  const [category, setCategory] = useState("");
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [postBlog, { isLoading }] = usePostBlogMutation();
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    let editor;
    editor = new EditorJS({
      holder: "editorjs",
      onReady: () => {
        editorRef.current = editor;
      },
      autofocus: true,
      tools: {
        header: {
          class: Header,
          inlineToolbar: true,
        },
        list: {
          class: List,
          inlineToolbar: true,
        },
      },
      data: {
        blocks: [
          {
            type: "paragraph",
            data: {
              text: "Start writing your blog post here..."
            }
          }
        ]
      }
    });

    return () => {
      if (editor && typeof editor.destroy === "function") {
        editor.destroy();
      }
      editorRef.current = null;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const content = await editorRef.current.save();
      const newPost = {
        title,
        coverImg,
        category,
        content,
        description: metaDescription,
        author: user?._id,
        rating: parseFloat(rating),
      };
      console.log(newPost);
      const response = await postBlog(newPost).unwrap();
      console.log(response);
      alert("Blog is Posted Successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      setMessage("Failed to submit post, please try again!");
    }
  };

  return (
    <div className="bg-white text-black dark:bg-gray-800 md:p-8 p-2">
      <h2 className="text-2xl font-semibold dark:text-white">Create A New Blog Post</h2>
      <form onSubmit={handleSubmit} className="space-y-5 pt-8">
        <div>
          <label className="text-semibold text-xl dark:text-white">Blog Title:</label>
          <input
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Ex: Marina del Rey"
            className="w-full inline-block bg-gray-200 dark:bg-gray-700 dark:text-white px-5 py-3 focus:outline-none"
          />
        </div>
        <div className="flex flex-col md:flex-row justify-between items-start gap-4">
          <div className="md:w-2/3 w-full">
            <p className="font-semibold text-xl mb-5 dark:text-white">Content Section</p>
            <p className="text-xs italic dark:text-gray-300">Write Your Post Below Here..</p>
            <div id="editorjs" className="bg-white dark:bg-gray-700 min-h-[300px] border border-gray-300 dark:border-gray-600"></div>
          </div>
          <div className="md:w-1/3 w-full border p-5 space-y-5 dark:border-gray-600">
            <p className="text-xl font-semibold dark:text-white">Choose Blog Format</p>
            <div>
              <label className="text-semibold dark:text-white">Blog Cover:</label>
              <input
                onChange={(e) => setCoverImg(e.target.value)}
                type="text"
                placeholder="https://unsplash.com/image1.jpg.."
                className="w-full inline-block bg-gray-200 dark:bg-gray-700 dark:text-white px-5 py-3 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-semibold dark:text-white">Blog Category:</label>
              <input
                onChange={(e) => setCategory(e.target.value)}
                type="text"
                placeholder="/health/mental-health/adhd.."
                className="w-full inline-block bg-gray-200 dark:bg-gray-700 dark:text-white px-5 py-3 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-semibold dark:text-white">Meta Description:</label>
              <textarea
                cols={4}
                rows={4}
                onChange={(e) => setMetaDescription(e.target.value)}
                placeholder="Write Your Blog Meta Description"
                className="w-full inline-block bg-gray-200 dark:bg-gray-700 dark:text-white px-5 py-3 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-semibold dark:text-white">Rating:</label>
              <input
                onChange={(e) => setRating(e.target.value)}
                type="number"
                min="0"
                max="5"
                step="0.1"
                className="w-full inline-block bg-gray-200 dark:bg-gray-700 dark:text-white px-5 py-3 focus:outline-none"
              />
            </div>
            <div>
              <label className="text-semibold dark:text-white">Author:</label>
              <input
                disabled
                value={user.username}
                type="text"
                placeholder={`{user.username} (not editable)`}
                className="w-full inline-block bg-gray-200 dark:bg-gray-700 dark:text-white px-5 py-3 focus:outline-none"
              />
            </div>
          </div>
        </div>
        {message && <p className="text-red-600">{message}</p>}
        <button 
          disabled={isLoading} 
          type="submit" 
          className="w-full mt-5 bg-pink-500 hover:bg-pink-400 font-medium py-3 rounded-md text-white"
        >
          {isLoading ? "Posting..." : "Add New Blog"}
        </button>
      </form>
    </div>
  );
};

export default AddPost;