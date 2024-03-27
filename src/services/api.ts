import { CreateFlightFormState } from '@/interfaces/CreateFlightFormState';
import { FlightsResponse } from '@/interfaces/FlightInterfaces';
import { LoginResponse } from '@/interfaces/LoginResponse';
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});


api.interceptors.request.use(config => {
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

export const login = async (email: string, password: string): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>('/login', { email, password });
    return response.data;
  } catch (error) {
    console.error('Erro ao fazer login:', error);
    throw error;
  }
};

export const getFlights = async (page = 0, size = 10, sort = 'id'): Promise<FlightsResponse> => {
  try {
    const response = await api.get<FlightsResponse>(`/flights?page=${page}&size=${size}&sort=${sort}`);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os voos:', error);
    throw error;
  }
};

export const deleteFlight = async (flightId: string): Promise<void> => {
  try {
    await api.delete(`/flights/${flightId}`);
    console.log(`Voo com ID: ${flightId} foi deletado com sucesso.`);
  } catch (error) {
    console.error('Erro ao deletar o voo:', error);
    throw error;
  }
};

export const createFlight = async (flightData: CreateFlightFormState): Promise<void> => {
  try {
    await api.post('/flights/create', { 
      flightNumber: flightData.flightNumber,
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



export default api;
