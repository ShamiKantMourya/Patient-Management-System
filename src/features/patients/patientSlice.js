import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const API_URL = "https://patient-management-system-backend.onrender.com";

export const fetchPatients = createAsyncThunk(
  "/patients/fetchPatients",
  async () => {
    const response = await axios.get(`${API_URL}/api/v1/patients`);
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
    [fetchPatients.fulfilled],
      (state, action) => {
        state.patients = action.payload;
        state.status = "success";
        state.error = null;
      },
      [fetchPatients.rejected],
      (state, action) => {
        state.error = action.payload;
        state.status = "success";
      },
      [fetchPatients.pending],
      (state) => {
        state.status = "loading";
      },
      [addPatients.fulfilled],
      (state, action) => {
        state.patients = [action.payload, ...state.patients];
        state.status = "success";
        state.error = null;
      },
      [addPatients.rejected],
      (state, action) => {
        state.error = action.payload;
      },
      [addPatients.pending],
      (state) => {
        state.status = "loading";
      },
      [deletePatientData.fulfilled],
      (state, action) => {
        state.patients = action.payload;
        state.status = "success";
        state.error = null;
      },
      [deletePatientData.rejected],
      (state, action) => {
        state.error = action.payload;
        state.status = "success";
      },
      [deletePatientData.pending],
      (state) => {
        state.status = "loading";
      },
      [updatePatients.fulfilled],
      (state, action) => {
        state.patients = action.payload;
        state.status = "success";
        state.error = null;
      },
      [updatePatients.rejected],
      (state, action) => {
        state.error = action.payload;
        state.status = "success";
      },
      [updatePatients.pending],
      (state) => {
        state.status = "loading";
      };
  },
});

export default patientSlice.reducer;
