import { CreateFlightFormState } from '@/interfaces/CreateFlightFormState';
import api from '../api';

export const getFlights = async (page = 0, size = 10, sort = 'id') => {
    try {
        const response = await api.get(`/flights?page=${page}&size=${size}&sort=${sort}`);
        return response.data;
    } catch (error) {
        console.error('Erro ao buscar os voos:', error);
        throw error;
    }
};

export const deleteFlight = async (flightId: string) => {
    try {
        await api.delete(`/flights/${flightId}`);
        console.log(`Voo com ID: ${flightId} foi deletado com sucesso.`);
    } catch (error) {
        console.error('Erro ao deletar o voo:', error);
        throw error;
    }
};

export const createFlight = async (flightData: CreateFlightFormState) => {
    try {
        const departureAirportCode = flightData.departureAirport.substring(0, 3).toUpperCase();
        const arrivalAirportCode = flightData.arrivalAirport.substring(0, 3).toUpperCase();
        const randomNumber = Math.floor(Math.random() * 1000);
        const flightNumber = `${departureAirportCode}${randomNumber}${arrivalAirportCode}`;

        await api.post('/flights/create', {
            flightNumber: flightNumber,
            departureDate: flightData.departureDate,
            arrivalDate: flightData.arrivalDate,
            departureAirport: flightData.departureAirport,
            arrivalAirport: flightData.arrivalAirport,
        });
        console.log("Voo criado com sucesso.");
    } catch (error) {
        console.error("Erro ao criar o voo:", error);
        throw error;
    }
};
