import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import vendors from '../../mocks/vendors.json';

export const fetchVendorData = createAsyncThunk('vendor/fetchVendorData', async () => vendors);

const vendorSlice = createSlice({
  name: 'vendor',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchVendorData.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchVendorData.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload;
    });
    builder.addCase(fetchVendorData.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  }
});

export default vendorSlice.reducer;
