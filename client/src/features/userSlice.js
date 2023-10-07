import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const register = createAsyncThunk("users/register", async (userData) => {
  console.log(userData);
  const response = await axios
    .post("http://localhost:3001/register", {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    })
    .then((res) => {
      //setresponseMsg(res.data);
      const user = res.data.user;
      return user;
    })
    .catch((err) => {
      console.log(err);
    });
});

export const login = createAsyncThunk("users/login", async (userData) => {
  try {
    const response = await axios.post("http://localhost:3001/login", {
      email: userData.email,
      password: userData.password,
    });
    const user = response.data.user;
    console.log(user);
    return user;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  user: [],
  isLoading: false,
  isSuccess: false,
  isError: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
    logout: (state) => {
      console.log("logout");
      state.user = []; // Clear user data
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log(action.payload);
        state.user = action.payload;
        state.isLoading = true;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset, logout } = userSlice.actions;
export default userSlice.reducer;
