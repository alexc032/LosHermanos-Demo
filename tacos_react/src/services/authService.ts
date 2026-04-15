import api from './api';

interface TokenResponse {
  access: string;
  refresh: string;
}

export const login = async (username: string, password: string): Promise<void> => {
  const res = await api.post<TokenResponse>('/api/token/', { username, password });
  localStorage.setItem('admin_token', res.data.access);
};

export const logout = (): void => {
  localStorage.removeItem('admin_token');
};

export const isAuthenticated = (): boolean => {
  return !!localStorage.getItem('admin_token');
};
