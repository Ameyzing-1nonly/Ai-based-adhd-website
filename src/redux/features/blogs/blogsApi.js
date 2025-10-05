import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const blogApi = createApi({
  reducerPath: "blogsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:8000/api/",
    credentials: "include",
  }),
  tagTypes: ['Blog'],
  endpoints: (builder) => ({
    fetchBlogs: builder.query({
      query: ({ search = "", category = "", location = "" }) =>
        `/blog?search=${search}&category=${category}&location=${location}`,
      providesTags: ['Blog']
    }),
    fetchBlogById: builder.query({
      query: (id) => `/blog/${id}`
    }),
    fetchRelatedBlogs: builder.query({
      query: (id) => `/blog/related/${id}`
    }),
    postBlog: builder.mutation({
      query: (newBlog) => ({
        url: "/blog/create-post",
        method: "POST",
        body: newBlog,
        credentials: "include"
      }),
      invalidatesTags: ['Blog']
    }),
    updateBlog: builder.mutation({
      query: ({ id, ...rest }) => ({
        url: `/blog/update-post/${id}`,
        method: "PATCH",
        body: rest,
        credentials: "include"
      }),
      invalidatesTags: (result, error, { id }) => [{ type: "Blog", id }]
    }),
    deleteBlog: builder.mutation({
      query: (id) => ({
        url: `/blog/${id}`,
        method: "DELETE",
        credentials: "include"
      }),
      invalidatesTags: (result, error, id) => [{ type: "Blog", id }]
    }),
    subscribeToBlog: builder.mutation({
      query: (email) => ({
        url: '/blog/subscribe',
        method: 'POST',
        body: { email },
      }),
    }),
  }),
});

export const {
  useFetchBlogsQuery,
  useFetchBlogByIdQuery,
  useFetchRelatedBlogsQuery,
  usePostBlogMutation,
  useUpdateBlogMutation,
  useDeleteBlogMutation,
  
} = blogApi;