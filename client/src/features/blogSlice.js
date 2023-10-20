import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const blogPost = createAsyncThunk("blog/blogPost", async (blogData) => {
  try {
    console.log(blogData);

    const response = await axios.post("http://localhost:3001/blogpost", {
      msg: blogData.msg,
      email: blogData.email,
    });
    console.log(response.data.posts);
    return response.data.posts;
  } catch (error) {
    console.log(error);
  }
});

export const getPosts = createAsyncThunk("blog/getPosts", async () => {
  try {
    const response = await axios.get("http://localhost:3001/displayPosts");
    //console.log(response.data);
    return response.data.posts;
  } catch (error) {
    console.log(error);
  }
});

export const deletePost = createAsyncThunk(
  "blog/deletePost",
  async (postid) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/deletepost/${postid}`
      );
      //console.log(response.data);
      return postid;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  blog: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(blogPost.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(blogPost.fulfilled, (state, action) => {
        console.log(action.payload);
        state.blog.push(action.payload);
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(blogPost.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(getPosts.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        console.log(action.payload);
        state.blog = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(getPosts.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      })
      .addCase(deletePost.pending, (state) => {
        state.isLoading = true;
        state.isSuccess = false;
        state.isError = false;
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        console.log(action.payload);
        state.blog = state.blog.filter((post) => post._id !== action.payload);
        console.log(state.blog);
        state.isLoading = false;
        state.isSuccess = true;
        state.isError = false;
      })
      .addCase(deletePost.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.isSuccess = false;
      });
  },
});

export default blogSlice.reducer;
