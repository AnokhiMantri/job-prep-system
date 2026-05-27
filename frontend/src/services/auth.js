import api from './api';

const TOKEN_KEY = 'authToken';
const USER_KEY = 'authUser';

export const saveToken = (token) => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const clearToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const isAuthenticated = () => Boolean(getToken());

export const saveUser = (user) => {
  if (!user) return;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUser = () => {
  const raw = localStorage.getItem(USER_KEY);
  return raw ? JSON.parse(raw) : null;
};

export const clearUser = () => {
  localStorage.removeItem(USER_KEY);
};

export const registerUser = async ({ name, email, password }) => {
  const response = await api.post('/api/auth/register', { name, email, password });
  saveToken(response.data.access_token);
  // save returned user if present
  if (response.data.user) saveUser(response.data.user);
  return response.data;
};

export const loginUser = async ({ email, password }) => {
  const response = await api.post('/api/auth/login', { email, password });
  saveToken(response.data.access_token);
  if (response.data.user) saveUser(response.data.user);
  return response.data;
};
