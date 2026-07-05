import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import users from '../../mocks/users.json';

export const loginUser = createAsyncThunk('auth/loginUser', async ({ username, password }) => {
  const user = users.find((entry) => entry.username === username && entry.password === password);
  if (!user) {
    throw new Error('Invalid credentials');
  }
  return user;
});

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    status: 'idle',
    error: null
  },
  reducers: {
    logoutUser: (state) => {
      state.user = null;
      state.status = 'idle';
      state.error = null;
      localStorage.removeItem('authToken');
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.status = 'loading';
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.status = 'succeeded';
      state.user = action.payload;
      localStorage.setItem('authToken', action.payload.token);
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.status = 'failed';
      state.error = action.error.message;
    });
  }
});

export const { logoutUser } = authSlice.actions;
export default authSlice.reducer;
