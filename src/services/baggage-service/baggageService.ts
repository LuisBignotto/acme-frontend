import api from "../api";

export const createBagage = async (bagageData: any) => {
    try {
        const response = await api.post('/baggages/create', bagageData);
        return response.data;
    } catch (error) {
        throw error;
    }
};