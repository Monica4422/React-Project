import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import requests from '../../mocks/requests.json';
import vendors from '../../mocks/vendors.json';
import riskData from '../../mocks/riskData.json';

export const fetchDashboardData = createAsyncThunk('dashboard/fetchDashboardData', async () => ({
  requests,
  vendors,
  risks: riskData
}));

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState: {
    data: null,
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchDashboardData.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchDashboardData.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.data = action.payload;
    });
    builder.addCase(fetchDashboardData.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  }
});

export default dashboardSlice.reducer;
