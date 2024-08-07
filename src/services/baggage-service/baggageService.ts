import api from "../api";
import { getUserByEmail } from "../user-service/userService";

// Função para obter uma bagagem específica pelo ID
export const getBaggage = async (baggageId: string) => {
    try {
        const response = await api.get(`/baggage-ms/baggages/${baggageId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Função para obter todas as bagagens
export const getAllBaggages = async () => {
    try {
        const response = await api.get("/baggage-ms/baggages");
        return response.data.content;
    } catch (error) {
        throw error;
    }
};

// Função para obter bagagem por tag
export const getBaggageByTag = async (baggageTag: string) => {
    try {
        const response = await api.get(`/baggage-ms/baggages/tag/${baggageTag}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Função para obter bagagens por email do usuário
export const getBaggagesByEmail = async (userEmail: string) => {
    try {
        const user = await getUserByEmail(userEmail);
        const response = await api.get(`/baggage-ms/baggages/user/${user.id}`);
        return response;
    } catch (error) {
        console.error('Error fetching baggages by email:', error);
        throw error;
    }
};


// Função para obter bagagens por voo
export const getBaggagesByFlight = async (flightId: string) => {
    try {
        const response = await api.get(`/baggage-ms/baggages/flight/${flightId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Função para obter bagagens por rastreador
export const getBaggagesByTracker = async (trackerId: string) => {
    try {
        const response = await api.get(`/baggage-ms/baggages/tracker/${trackerId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Função para criar uma nova bagagem
export const createBaggage = async (baggageData: any) => {
    try {
        const response = await api.post("/baggage-ms/baggages", baggageData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Função para atualizar uma bagagem pelo ID
export const updateBaggage = async (baggageId: string, baggageData: any) => {
    try {
        const response = await api.put(`/baggage-ms/baggages/${baggageId}`, baggageData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Função para deletar uma bagagem pelo ID
export const deleteBaggage = async (baggageId: number) => {
    try {
        await api.delete(`/baggage-ms/baggages/${baggageId}`);
    } catch (error) {
        throw error;
    }
};

// Função para obter QR Code de uma bagagem
export const getQrCode = async (params: any): Promise<Blob> => {
    try {
        const response = await api.get(`/baggage-ms/baggages/generate`, {
            params,
            responseType: 'blob',
        });
        return response.data;
    } catch (error) {
        throw error;
    }
};
