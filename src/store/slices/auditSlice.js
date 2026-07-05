import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchAuditData = createAsyncThunk('audit/fetchAuditData', async () => [
  { id: 1, user: 'A. Singh', action: 'Approved purchase', time: '09:45' },
  { id: 2, user: 'K. Chen', action: 'Rejected request', time: '11:20' },
  { id: 3, user: 'M. Patel', action: 'Updated vendor profile', time: '15:10' }
]);

const auditSlice = createSlice({
  name: 'audit',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAuditData.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchAuditData.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload;
    });
    builder.addCase(fetchAuditData.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  }
});

export default auditSlice.reducer;
