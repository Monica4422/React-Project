import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import requests from '../../mocks/requests.json';

export const fetchProcurementData = createAsyncThunk('procurement/fetchProcurementData', async () => requests);

const procurementSlice = createSlice({
  name: 'procurement',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchProcurementData.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchProcurementData.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload;
    });
    builder.addCase(fetchProcurementData.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  }
});

export default procurementSlice.reducer;
