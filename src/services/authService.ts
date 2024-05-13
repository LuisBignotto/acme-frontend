import api from './api';

export const isAuthenticated = (): boolean => {
    return !!localStorage.getItem('authToken');
};

export const logout = (): void => {
    localStorage.removeItem('authToken');
};

api.interceptors.request.use(config => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

export const login = async (email: string, password: string) => {
    try {
        localStorage.removeItem('authToken');
        const response = await api.post('/user-ms/users/login', { email, password });
        return response.data;
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        throw error;
    }
};
