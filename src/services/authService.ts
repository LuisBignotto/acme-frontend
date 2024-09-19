import api from './api';

export const isAuthenticated = (): boolean => {
  const session = localStorage.getItem('session');
  if (!session) return false;

  const parsedSession = JSON.parse(session);
  const oneDayInMilliseconds = 24 * 60 * 60 * 1000;
  const now = Date.now();
  return now - parsedSession.createdAt < oneDayInMilliseconds;
};

export const logout = (): void => {
  localStorage.removeItem('session');
};

api.interceptors.request.use(config => {
  const session = localStorage.getItem('session');
  if (session) {
    const token = JSON.parse(session).tokenJwt;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const login = async (email: string, password: string) => {
  const response = await api.post('/user-ms/users/login', { email, password });
  return response.data;
};
