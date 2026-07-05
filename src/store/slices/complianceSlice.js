import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchComplianceData = createAsyncThunk('compliance/fetchComplianceData', async () => [
  { id: 1, name: 'SOC 2', status: 'Compliant', dueDate: '2026-09-01' },
  { id: 2, name: 'ISO 27001', status: 'Pending', dueDate: '2026-08-15' },
  { id: 3, name: 'Vendor Certificate', status: 'Expired', dueDate: '2026-06-30' }
]);

const complianceSlice = createSlice({
  name: 'compliance',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchComplianceData.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchComplianceData.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload;
    });
    builder.addCase(fetchComplianceData.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  }
});

export default complianceSlice.reducer;
