import { configureStore } from "@reduxjs/toolkit";
import galleryReducer from "./features/gallerySlice";
import authReducer from "./features/authSlice";
import userReducer from "./features/userSlice";

const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    auth: authReducer,
    user: userReducer,
  },
});

export default store;
