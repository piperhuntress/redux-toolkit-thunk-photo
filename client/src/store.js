import { configureStore } from "@reduxjs/toolkit";
import galleryReducer from "./features/gallerySlice";
import authReducer from "./features/authSlice";
import userReducer from "./features/userSlice";
import blogReducer from "./features/blogSlice";

const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    auth: authReducer,
    user: userReducer,
    blog: blogReducer,
  },
});

export default store;
