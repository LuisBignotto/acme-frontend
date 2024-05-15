import api from "../api";

// Função para buscar usuário por email
export const getUserByEmail = async (email: string) => {
    try {
        const response = await api.get(`/user-ms/users/search?email=${email}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Função para buscar todos usuários
export const getAllUsers = async (page = 0, size = 10, sort = 'id') => {
    try {
        const response = await api.get(`/user-ms/users?page=${page}&size=${size}&sort=${sort}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Função para atualizar um usuário
export const updateUser = async (userId: number, userData: any) => {
    try {
        const response = await api.put(`/user-ms/users/${userId}`, userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Função para deletar um usuário
export const deleteUser = async (userId: number) => {
    try {
        await api.delete(`/user-ms/users/${userId}`);
    } catch (error) {
        throw error;
    }
};

// Função para registrar um usuário
export const registerUser = async (userData: any) => {
    try {
        const response = await api.post("/user-ms/users/register", userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Função para adicionar cargo a um usuário
export const addRoleToUser = async (userId: number, role: string) => {
    try {
        const response = await api.post(`/user-ms/users/${userId}/roles/${role}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Função para remover cargo de um usuário
export const removeRoleFromUser = async (userId: number, role: string) => {
    try {
        const response = await api.delete(`/user-ms/users/${userId}/roles/${role}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Função para buscar informações do usuário autenticado
export const getUserInfo = async () => {
    try {
        const response = await api.get("/user-ms/users/me");
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Função para buscar usuário por ID
export const getUserById = async (userId: number) => {
    try {
        const response = await api.get(`/user-ms/users/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Função para buscar usuário por CPF
export const getUserByCPF = async (cpf: string) => {
    try {
        const response = await api.get(`/user-ms/users/cpf/${cpf}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
