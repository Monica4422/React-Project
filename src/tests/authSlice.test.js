import authReducer, { loginUser } from './authSlice';

describe('auth slice', () => {
  it('handles login success', () => {
    const state = authReducer({ user: null, status: 'idle', error: null }, {
      type: loginUser.fulfilled.type,
      payload: { name: 'Ava', token: 'abc' }
    });

    expect(state.user.name).toBe('Ava');
    expect(state.status).toBe('succeeded');
  });

  it('handles login failure', () => {
    const state = authReducer({ user: null, status: 'idle', error: null }, {
      type: loginUser.rejected.type,
      error: { message: 'Invalid credentials' }
    });

    expect(state.status).toBe('failed');
    expect(state.error).toBe('Invalid credentials');
  });
});
