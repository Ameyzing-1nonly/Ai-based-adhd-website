import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { usePostCommentMutation } from "../../../redux/features/comments/commentApi";
import { useFetchBlogByIdQuery } from "../../../redux/features/blogs/blogsApi";
const PostComment = () => {
  const { id } = useParams();
  const [comment, setComment] = useState("");
  //todo is handle posting functionality letter
  const {user}=useSelector((state)=>state.auth);
  // console.log(user)

  const [postComment]=usePostCommentMutation();
  const {refetch}=useFetchBlogByIdQuery(id, {skip:!id})
  const navigate=useNavigate()
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!user){
      alert("Please Login to Comment on this Post")
      navigate("/login");
      return 
    }

    const newComment={
      comment:comment,
      user:user?._id,
      postId:id
    }
    // console.log(newComment)
    try {
      const response=await postComment(newComment).unwrap();
      console.log(response)
      alert("Comment Posted Successfully")
      setComment("")
      refetch()
      
    } catch (error) {
      console.log(error)
      alert("An error occur while posting comment")
      
    }

  }



  return (
    <div className="mt-8 ">
      <h3 className="text-lg font-medium mb-8 mx-8 dark:text-gray-200">Leave a Comment</h3>
      <form onSubmit={handleSubmit} action="">
        <textarea
        className="w-full bg-white dark:bg-gray-800 border dark:text-gray-200 focus:outline-none p-5"
          name="text"
          cols="30"
          rows="10"
          placeholder="Share Your Openion About this Post"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <button type="submit" className="w-full bg-pink-500 hover:bg-pink-600 text-white font-medium py-3 rounded-md">Submit</button>
      </form>
    </div>
  );
};

export default PostComment;
