import { createSlice } from '@reduxjs/toolkit';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    sidebarOpen: true,
    themeMode: 'light'
  },
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    toggleTheme: (state) => {
      state.themeMode = state.themeMode === 'light' ? 'dark' : 'light';
    }
  }
});

export const { toggleSidebar, toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;
