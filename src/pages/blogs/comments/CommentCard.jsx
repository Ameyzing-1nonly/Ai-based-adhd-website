import { useSelector } from "react-redux";
import { formatDate } from "../../../utils/formatDate";
import defaultImg from "../../../assets/default-img.jpg";
import PostComment from "./PostComment";
import { useState } from "react";

const CommentCard = ({ comments }) => {
  const { user } = useSelector((state) => state.auth);
  const [showAllComments, setShowAllComments] = useState(false);
  const visibleComments = showAllComments ? comments : comments.slice(0, 2);

  return (
    <div className="my-6 bg-white dark:bg-slate-800 rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        {comments?.length > 0 ? (
          <div>
            <h3 className="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
              Comments ({comments.length})
            </h3>
            <div className="space-y-6">
              {visibleComments.map((comment, index) => (
                <div key={index} className="flex flex-col space-y-3">
                  <div className="flex items-center space-x-3">
                    <img
                      src={defaultImg}
                      alt=""
                      className="h-12 w-12 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-lg font-medium capitalize text-pink-500 dark:text-pink-400">
                        {comment?.user?.username}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(comment.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-4">
                    <p className="text-gray-700 dark:text-gray-300">
                      {comment?.comment}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            {comments.length > 2 && (
              <button
                onClick={() => setShowAllComments(!showAllComments)}
                className="mt-4 text-pink-500 dark:text-pink-400 font-medium hover:underline focus:outline-none"
              >
                {showAllComments ? "Hide Comments" : `View ${comments.length - 2} more comments`}
              </button>
            )}
          </div>
        ) : (
          <div className="text-lg font-medium text-gray-700 dark:text-gray-300">
            No Comments Found!
          </div>
        )}
      </div>
      <div className="border-t border-gray-200 dark:border-gray-700">
        <PostComment />
      </div>
    </div>
  );
};

export default CommentCard;