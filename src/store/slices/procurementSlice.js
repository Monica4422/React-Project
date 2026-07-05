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
  reducers: {
    addRequest: (state, action) => {
      state.items.unshift(action.payload);
    },
    updateRequestStatus: (state, action) => {
      const { id, status, reviewer } = action.payload;
      const item = state.items.find((request) => request.id === id);
      if (item) {
        item.status = status;
        item.reviewer = reviewer;
        item.lastUpdated = new Date().toISOString();
      }
    }
  },
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

export const { addRequest, updateRequestStatus } = procurementSlice.actions;
export default procurementSlice.reducer;
