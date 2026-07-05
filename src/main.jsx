import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import { store, persistor } from './store/store';
import App from './App';
import './styles.css';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { main: '#0f172a' },
    secondary: { main: '#2563eb' },
    success: { main: '#0f766e' },
    warning: { main: '#d97706' },
    error: { main: '#dc2626' }
  },
  typography: {
    fontFamily: 'Inter, Segoe UI, sans-serif'
  }
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  </React.StrictMode>
);
