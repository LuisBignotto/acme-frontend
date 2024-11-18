import { Baggages } from "@/interfaces/baggage-interfaces/Baggages";
import api from "../api";
import { getUserByEmail } from "../user-service/userService";
import { User } from "@/interfaces/user-interfaces/user";

// Função para obter uma bagagem específica pelo ID
export const getBaggage = async (baggageId: string) => {
    const response = await api.get(`/baggage-ms/baggages/${baggageId}`);
    return response.data;
};

// Função para obter todas as bagagens
export const getAllBaggages = async () => {
    const response = await api.get("/baggage-ms/baggages");
    return response.data.content;
};

// Função para obter bagagem por tag
export const getBaggageByTag = async (baggageTag: string) => {
    const response = await api.get(`/baggage-ms/baggages/tag/${baggageTag}`);
    return response.data;
};

// Função para obter bagagens por email do usuário
export const getBaggagesByEmail = async (userEmail: string) => {
    const user = await getUserByEmail(userEmail);
    const response = await api.get(`/baggage-ms/baggages/user/${user.id}`);
    return response;
};

// Função para obter bagagens por voo
export const getBaggagesByFlight = async (flightId: string) => {
    const response = await api.get(`/baggage-ms/baggages/flight/${flightId}`);
    return response.data;
};

// Função para obter bagagens por rastreador
export const getBaggagesByTracker = async (trackerId: string) => {
    const response = await api.get(`/baggage-ms/baggages/tracker/${trackerId}`);
    return response.data;
};

// Função para criar uma nova bagagem
export const createBaggage = async (baggageData: {
    userId: number;
    tag: string;
    color: string;
    weight: number;
    statusId: number;
    lastLocation: string;
    flightId: number;
    trackers: User[];
}) => {
    const response = await api.post("/baggage-ms/baggages", baggageData);
    return response.data;
};

// Função para atualizar uma bagagem pelo ID
export const updateBaggage = async (baggageId: string, baggageData: Baggages) => {
    console.log(baggageData);
    const response = await api.put(`/baggage-ms/baggages/${baggageId}`, baggageData);
    console.log(response.data);
    return response.data;
};

// Função para deletar uma bagagem pelo ID
export const deleteBaggage = async (baggageId: number) => {
    await api.delete(`/baggage-ms/baggages/${baggageId}`);
};

// Função para obter QR Code de uma bagagem
export const getQrCode = async (params: {
    id: number,
    userId: number,
    tag: string,
    color: string,
    weight: number,
    flightId: number,
}): Promise<Blob> => {
    const response = await api.get(`/baggage-ms/baggages/generate`, {
        params,
        responseType: 'blob',
    });
    return response.data;
};

export const countBaggage = async (flightId: string) => {
    try {
        const response = await fetch(`http://192.168.15.102:80/count?flightId=${flightId}`);
        const data = await response.json();
        return data.count;
    } catch (error) {
        console.error('Erro ao buscar a contagem:', error);
        return 0;
    }
};
