import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/comment",
    credentials: "include",
  }),

  tagTypes: ["Comment"],
  endpoints: (builder) => ({
    postComment: builder.mutation({
      query: (commentData) => ({
        url: "/post-comment",
        method: "POST",
        body: commentData,
      }),
      invalidatesTags: (result, error, {postId}) => [{ type: "Comment", id: postId }],
    }),

    getComment:builder.query({
        query:()=>({
            url:"/total-comment",
            method:"GET",
          
        })
    })
  }),
});

export const {useGetCommentQuery, usePostCommentMutation}=commentApi;
export default commentApi;
