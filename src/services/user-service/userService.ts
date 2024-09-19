import { User } from "@/interfaces/user-interfaces/user";
import api from "../api";
import { UserRegister } from "@/interfaces/user-interfaces/user-register";

// Função para buscar usuário por email
export const getUserByEmail = async (email: string) => {
    const response = await api.get(`/user-ms/users/search?email=${email}`);
    return response.data;
};

// Função para buscar todos usuários
export const getAllUsers = async (page = 0, size = 10, sort = 'id') => {
    const response = await api.get(`/user-ms/users?page=${page}&size=${size}&sort=${sort}`);
    return response.data;
};

// Função para atualizar um usuário
export const updateUser = async (userId: number, userData: User) => {
    const response = await api.put(`/user-ms/users/${userId}`, userData);
    return response.data;
};

// Função para deletar um usuário
export const deleteUser = async (userId: number) => {
    await api.delete(`/user-ms/users/${userId}`);
};

// Função para registrar um usuário
export const registerUser = async (userData: UserRegister) => {
    const response = await api.post("/user-ms/users/register", userData);
    return response.data;
};

// Função para atualizar cargo de um usuário
export const updateUserRole = async (userId: number, role: string) => {
    const response = await api.post(`/user-ms/users/${userId}/role/${role}`);
    return response.data;
};

// Função para buscar informações do usuário autenticado
export const getUserInfo = async () => {
    const response = await api.get("/user-ms/users/me");
    return response.data;
};

// Função para buscar usuário por ID
export const getUserById = async (userId: number) => {
    const response = await api.get(`/user-ms/users/${userId}`);
    return response.data;
};

// Função para buscar usuário por CPF
export const getUserByCPF = async (cpf: string) => {
    const response = await api.get(`/user-ms/users/cpf/${cpf}`);
    return response.data;
};
