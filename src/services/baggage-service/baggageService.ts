import api from "../api";

export const getBaggage = async (baggageId: string) => {
    try {
        const response = await api.get(`/baggages/${baggageId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getAllBaggages = async () => {
    try {
        const response = await api.get("/baggages");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getBaggageByTag = async (baggageTag: string) => {
    try {
        const response = await api.get(`/baggages/tag/${baggageTag}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getBaggagesByEmail = async (email: string) => {
    try {
        const response = await api.get(`/baggages/email/${email}`);
        return response;
    } catch (error) {
        throw error;
    }
};

export const getUserBaggage = async (baggageId: string) => {
    try {
        const response = await api.get(`/baggages/add/${baggageId}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const addBaggageToUser = async (baggageData: any) => {
    try {
        const response = await api.post("/baggages/add", baggageData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const createBaggage = async (baggageData: any) => {
    try {
        const response = await api.post("/baggages/create", baggageData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateBaggage = async (baggageId: string, baggageData: any) => {
    try {
        const response = await api.put(`/baggages/${baggageId}`, baggageData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteBaggage = async (baggageId: string) => {
    try {
        await api.delete(`/baggages/${baggageId}`);
    } catch (error) {
        throw error;
    }
};

export const deleteUserBaggage = async (baggageId: string) => {
    try {
        await api.delete(`/baggages/delete/${baggageId}`);
    } catch (error) {
        throw error;
    }
};