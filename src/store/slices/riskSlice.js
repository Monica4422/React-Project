import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import riskData from '../../mocks/riskData.json';

export const fetchRiskData = createAsyncThunk('risk/fetchRiskData', async () => riskData);

const riskSlice = createSlice({
  name: 'risk',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchRiskData.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchRiskData.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload;
    });
    builder.addCase(fetchRiskData.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  }
});

export default riskSlice.reducer;
