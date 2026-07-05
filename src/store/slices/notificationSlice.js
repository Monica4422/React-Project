import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import notifications from '../../mocks/notifications.json';

export const fetchNotifications = createAsyncThunk('notification/fetchNotifications', async () => notifications);

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    items: [],
    status: 'idle',
    error: null
  },
  reducers: {
    markAllAsRead: (state) => {
      state.items = state.items.map((item) => ({ ...item, read: true }));
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchNotifications.pending, (state) => {
      state.status = 'loading';
    });
    builder.addCase(fetchNotifications.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.items = action.payload;
    });
    builder.addCase(fetchNotifications.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  }
});

export const { markAllAsRead } = notificationSlice.actions;
export default notificationSlice.reducer;
