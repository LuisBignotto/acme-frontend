import { MessageCreate, TicketCreate } from "@/interfaces/ticket-interfaces/ticket-interfaces";
import api from "../api";

// Função para criar um novo ticket
export const createTicket = async (ticketData: TicketCreate) => {
    try {
        const response = await api.post("/ticket-ms/tickets", ticketData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Função para buscar um ticket pelo ID
export const getTicketById = async (ticketId: number) => {
    try {
        const response = await api.get(`/ticket-ms/tickets/${ticketId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Função para buscar todos os tickets 
export const getAllTickets = async (page = 0, size = 10, sort = 'id') => {
    try {
        const response = await api.get(`/ticket-ms/tickets?page=${page}&size=${size}&sort=${sort}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Função para buscar tickets por ID do usuário
export const getTicketsByUserId = async (userId: number) => {
    try {
        const response = await api.get(`/ticket-ms/tickets/user/${userId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Função para atualizar um ticket
export const updateTicket = async (ticketId: number, status: string) => {
    try {
        const response = await api.put(`/ticket-ms/tickets/${ticketId}`, { status });
        return response.data;
    } catch (error) {
        throw error;
    }
};


// Função para deletar um ticket
export const deleteTicket = async (ticketId: number) => {
    try {
        await api.delete(`/ticket-ms/tickets/${ticketId}`);
    } catch (error) {
        throw error;
    }
};

// Função para adicionar uma mensagem a um ticket
export const addMessageToTicket = async (ticketId: number, messageData: MessageCreate) => {
    try {
        const response = await api.post(`/ticket-ms/tickets/${ticketId}/messages`, messageData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Função para buscar mensagens de um ticket
export const getMessagesByTicketId = async (ticketId: number) => {
    try {
        const response = await api.get(`/ticket-ms/tickets/${ticketId}/messages`);
        return response.data;
    } catch (error) {
        throw error;
    }
};
