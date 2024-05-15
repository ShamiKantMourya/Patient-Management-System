import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://patient-management-system-backend.onrender.com";

export const fetchPatients = createAsyncThunk(
  "/patients/fetchPatients",
  async () => {
    const response = await axios.get(`${API_URL}/api/v1/patients`);
    // console.log(response, "patient response");
    return response?.data?.patient;
  }
);
export const addPatients = createAsyncThunk(
  "/patients/addPatients",
  async (bodyData) => {
    const response = await axios.post(`${API_URL}/api/v1/patients`, bodyData);
    return response.data.patient;
  }
);
export const deletePatientData = createAsyncThunk(
  "/patients/deletePatient",
  async (id) => {
    const response = await axios.delete(`${API_URL}/api/v1/${id}`);
    return response.data.patient;
  }
);
export const updatePatients = createAsyncThunk(
  "/wards/updatePatients",
  async ({ id, formData }) => {
    const response = await axios.put(
      `${API_URL}/api/v1/patients/${id}`,
      formData
    );
    return response.data.patient;
  }
);
export const patientSlice = createSlice({
  name: "patients",
  initialState: {
    patients: [],
    error: null,
    status: "idle",
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPatients.fulfilled,
      (state, action) => {
        // console.log(state, "state");
        state.patients = action.payload;
        state.status = "success";
        state.error = null;
      }),
      builder.addCase(fetchPatients.rejected,
      (state, action) => {
        state.error = action.payload;
        state.status = "success";
      }),
      builder.addCase(fetchPatients.pending,
      (state) => {
        state.status = "loading";
      }),
      builder.addCase(addPatients.fulfilled,
      (state, action) => {
        state.patients = [action.payload, ...state.patients];
        state.status = "success";
        state.error = null;
      }),
      builder.addCase(addPatients.rejected,
      (state, action) => {
        state.error = action.payload;
      }),
      builder.addCase(addPatients.pending,
      (state) => {
        state.status = "loading";
      }),
      builder.addCase(deletePatientData.fulfilled,
      (state, action) => {
        state.patients = action.payload;
        state.status = "success";
        state.error = null;
      }),
      builder.addCase(deletePatientData.rejected,
      (state, action) => {
        state.error = action.payload;
        state.status = "success";
      }),
      builder.addCase(deletePatientData.pending,
      (state) => {
        state.status = "loading";
      }),
      builder.addCase(updatePatients.fulfilled,
      (state, action) => {
        state.patients = action.payload;
        state.status = "success";
        state.error = null;
      }),
      builder.addCase(updatePatients.rejected,
      (state, action) => {
        state.error = action.payload;
        state.status = "success";
      }),
      builder.addCase(updatePatients.pending,
      (state) => {
        state.status = "loading";
      });
  },
});

export default patientSlice.reducer;
