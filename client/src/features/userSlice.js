import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const register = createAsyncThunk("users/register", async (userData) => {
  try {
    const response = await axios.post("http://localhost:3001/register", {
      name: userData.name,
      email: userData.email,
      password: userData.password,
    });

    const user = response.data.user;
    return user;
  } catch (error) {
    console.log(error);
    throw error; // Re-throw the error to be handled by the rejected action
  }
});

export const login = createAsyncThunk("users/login", async (userData) => {
  try {
    const response = await axios.post("http://localhost:3001/login", {
      email: userData.email,
      password: userData.password,
    });
    const user = response.data.user;
    console.log(response);
    return user;
  } catch (error) {
    if (error.response.status === 401) {
      throw new Error("Invalid credentials");
    } else {
      throw new Error("Login failed. Please check your credentials.");
    }
  }
});

export const logout = createAsyncThunk("users/logout", async () => {
  try {
    // Send a request to log out (clear cookies or JWT token)
    const response = await axios.post("http://localhost:3001/logout");

    // Perform other cleanup or logout-related actions as needed

    console.log("logout");
    // Additional logout logic can also be placed here
  } catch (error) {
    console.log(error);
  }
});
const initialState = {
  user: {},
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
      })
      .addCase(register.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoading = false;
        state.isSuccess = true;
      })
      .addCase(login.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      })
      .addCase(logout.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(logout.fulfilled, (state) => {
        // Clear user data or perform additional cleanup if needed
        state.user = {};
        state.isLoading = false;
        state.isSuccess = false;
      })
      .addCase(logout.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const { reset } = userSlice.actions;
export default userSlice.reducer;
