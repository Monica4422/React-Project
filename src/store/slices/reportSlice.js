import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import reports from '../../mocks/reports.json';

export const fetchReports = createAsyncThunk('report/fetchReports', async () => reports);

const reportSlice = createSlice({
  name: 'report',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchReports.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchReports.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload;
    });
    builder.addCase(fetchReports.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  }
});

export default reportSlice.reducer;
