import { MessageCreate, TicketCreate } from "@/interfaces/ticket-interfaces/ticket-interfaces";
import api from "../api";

// Função para criar um novo ticket
export const createTicket = async (ticketData: TicketCreate) => {
    const response = await api.post("/ticket-ms/tickets", ticketData);
    return response.data;
};

// Função para buscar um ticket pelo ID
export const getTicketById = async (ticketId: number) => {
    const response = await api.get(`/ticket-ms/tickets/${ticketId}`);
    return response.data;
};

// Função para buscar todos os tickets 
export const getAllTickets = async (page = 0, size = 10, sort = 'id') => {
    const response = await api.get(`/ticket-ms/tickets?page=${page}&size=${size}&sort=${sort}`);
    return response.data;
};

// Função para buscar tickets por ID do usuário
export const getTicketsByUserId = async (userId: number) => {
    const response = await api.get(`/ticket-ms/tickets/user/${userId}`);
    return response.data;
};

// Função para atualizar um ticket
export const updateTicket = async (ticketId: number, status: string) => {
    const response = await api.put(`/ticket-ms/tickets/${ticketId}`, { status });
    return response.data;
};

// Função para deletar um ticket
export const deleteTicket = async (ticketId: number) => {
    await api.delete(`/ticket-ms/tickets/${ticketId}`);
};

// Função para adicionar uma mensagem a um ticket
export const addMessageToTicket = async (ticketId: number, messageData: MessageCreate) => {
    const response = await api.post(`/ticket-ms/tickets/${ticketId}/messages`, messageData);
    return response.data;
};

// Função para buscar mensagens de um ticket
export const getMessagesByTicketId = async (ticketId: number) => {
    const response = await api.get(`/ticket-ms/tickets/${ticketId}/messages`);
    return response.data;
};
