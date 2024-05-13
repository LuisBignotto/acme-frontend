import api from "../api";

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
        return response.data;
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

// Função para obter bagagem por tag
export const getBaggagesByEmail = async (baggageTag: string) => {
    try {
        const response = await api.get(`/baggage-ms/baggages/tag/${baggageTag}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

// Função para adicionar bagagem a um usuário (ajustar conforme necessário)
export const addBaggageToUser = async (baggageData: any) => {
    try {
        const response = await api.post("/baggage-ms/baggages", baggageData);
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
export const deleteBaggage = async (baggageId: string) => {
    try {
        await api.delete(`/baggage-ms/baggages/${baggageId}`);
    } catch (error) {
        throw error;
    }
};

// Função para obter QR Code de uma bagagem (ajustar conforme necessário)
export const getQrCode = async (baggageId: string): Promise<string> => {
    try {
        const response = await api.get(`/baggage-ms/qrcode?id=${baggageId}`, { responseType: 'blob' });
        return URL.createObjectURL(response.data);
    } catch (error) {
        throw error;
    }
};
