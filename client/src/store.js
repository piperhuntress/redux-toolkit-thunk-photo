import { configureStore } from "@reduxjs/toolkit";
import galleryReducer from "./features/gallerySlice";
import authReducer from './features/authSlice'


const store = configureStore({
  reducer: {
    gallery: galleryReducer,
    auth:authReducer,
  },
});

export default store;