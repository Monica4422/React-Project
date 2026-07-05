import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { configureStore } from '@reduxjs/toolkit';
import LoginPage from './LoginPage';
import authReducer from '../store/slices/authSlice';

const renderWithStore = () => {
  const store = configureStore({ reducer: { auth: authReducer } });
  return render(
    <Provider store={store}>
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    </Provider>
  );
};

describe('LoginPage', () => {
  it('renders the login heading', () => {
    renderWithStore();
    expect(screen.getByText(/sign in to e-grcp/i)).toBeInTheDocument();
  });
});
