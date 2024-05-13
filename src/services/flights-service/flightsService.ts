import api from '../api';
import { flightData } from '@/interfaces/flight-interfaces/flightData';

// Função para obter uma lista de voos com paginação e ordenação
export const getFlights = async (page = 0, size = 10, sort = 'departureDate') => {
    try {
        const response = await api.get(`/flight-ms/flights?page=${page}&size=${size}&sort=${sort}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Função para obter detalhes de um voo específico pelo ID
export const getFlight = async (flightId: string) => {
    try {
        const response = await api.get(`/flight-ms/flights/${flightId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Função para obter detalhes de um voo pelo tag
export const getFlightByTag = async (flightTag: string) => {
    try {
        const response = await api.get(`/flight-ms/flights/search?tag=${flightTag}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Função para deletar um voo pelo ID
export const deleteFlight = async (flightId: string) => {
    try {
        await api.delete(`/flight-ms/flights/${flightId}`);
    } catch (error) {
        throw error;
    }
};

// Função para criar um novo voo
export const createFlight = async (flightData: flightData) => {
    try {
        const response = await api.post('/flight-ms/flights', flightData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Função para atualizar um voo pelo ID
export const updateFlight = async (flightId: string, flightData: any) => {
    try {
        const response = await api.put(`/flight-ms/flights/${flightId}`, flightData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
