import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const getPhotos = createAsyncThunk("photos/getPhotos", async () => {
  try {
    const response = await axios.get(
      "https://picsum.photos/v2/list?page=2&limit=9"
    );
    return response.data;
  } catch (err) {
    return err.message;
  }
});

export const gallerySlice = createSlice({
  name: "gallery",
  initialState: {
    photos: [],
    isloading: false,
  },
  extraReducers: {
    [getPhotos.pending]: (state) => {
      state.isloading = true;
    },
    [getPhotos.fulfilled]: (state, action) => {
      state.photos = action.payload;
      //console.log(action.payload);
      state.isloading = false;
    },
    [getPhotos.rejected]: (state) => {
      state.isloading = false;
    },
  },
});

export default gallerySlice.reducer;
