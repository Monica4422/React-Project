import users from '../mocks/users.json';

export async function login({ username, password }) {
  const user = users.find((entry) => entry.username === username && entry.password === password);
  if (!user) {
    const error = new Error('Invalid credentials');
    error.code = 'AUTH_INVALID';
    throw error;
  }
  return { ...user };
}
