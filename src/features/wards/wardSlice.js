// import { create } from '@mui/material/styles/createTransitions';
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://patient-management-system-backend.onrender.com";

export const fetchWards = createAsyncThunk("/wards/fetchWards", async () => {
  const response = await axios.get(`${API_URL}/api/v1/wards`);
  return response?.data?.ward;
});
export const addWards = createAsyncThunk(
  "/wards/addWards",
  async (bodyData) => {
    const response = await axios.post(`${API_URL}/api/v1/wards`, bodyData);
    return response.data.ward;
  }
);
export const deleteWardData = createAsyncThunk(
  "/wards/deleteWardData",
  async (id) => {
    // console.log(id, "ward id")
    const response = await axios.delete(`${API_URL}/api/v1/wards/${id}`);
    return response.data.ward;
  }
);

export const updateWards = createAsyncThunk(
  "/wards/updateWards",
  async ({ id, formData }) => {
    const response = await axios.put(`${API_URL}/api/v1/wards/${id}`, formData);
    return response.data.ward;
  }
);
export const wardSlice = createSlice({
  name: "wards",
  initialState: {
    wards: [],
    error: null,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchWards.fulfilled, (state, action) => {
      // console.log(action);
      state.wards = action.payload;
      state.status = "success";
      state.error = null;
    }),
      builder.addCase(fetchWards.rejected, (state, action) => {
        state.error = action.payload;
      }),
      builder.addCase(fetchWards.pending, (state) => {
        state.status = "loading";
      }),
      builder.addCase(addWards.fulfilled, (state, action) => {
        state.wards = [action.payload, ...state.wards];
        state.status = "success";
        state.error = null;
      }),
      builder.addCase(addWards.rejected, (state, action) => {
        state.error = action.payload;
      }),
      builder.addCase(addWards.pending, (state) => {
        state.status = "loading";
      }),
      builder.addCase(deleteWardData.fulfilled, (state, action) => {
        state.wards = action.payload;
        state.status = "success";
        state.error = null;
      }),
      builder.addCase(deleteWardData.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "success";
      }),
      builder.addCase(deleteWardData.pending, (state) => {
        state.status = "loading";
      }),
      builder.addCase(updateWards.fulfilled, (state, action) => {
        state.wards = action.payload;
        state.status = "success";
        state.error = null;
      }),
      builder.addCase(updateWards.rejected, (state, action) => {
        state.error = action.payload;
        state.status = "success";
      }),
      builder.addCase(updateWards.pending, (state) => {
        state.status = "loading";
      });
  },
});

export default wardSlice.reducer;
