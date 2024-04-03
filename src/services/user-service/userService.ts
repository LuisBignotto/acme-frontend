import api from "../api";

export const getActiveUsers = async (page: number, size: number, sort: string) => {
    try {
        const response = await api.get(`/users/active?page=${page}&size=${size}&sort=${sort}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getInactiveUsers = async (page: number, size: number, sort: string) => {
    try {
        const response = await api.get(`/users/inactive?page=${page}&size=${size}&sort=${sort}`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getUser = async () => {
    try {
        const response = await api.get("/users");
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const updateUser = async (userData: any) => {
    try {
        const response = await api.put("/users/update", userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const deleteUser = async () => {
    try {
        await api.delete("/users");
    } catch (error) {
        throw error;
    }
};

export const registerUser = async (userData: any) => {
    try {
        const response = await api.post("/users/register", userData);
        return response.data;
    } catch (error) {
        throw error;
    }
};
