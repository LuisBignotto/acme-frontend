import { Flight } from "./FlightInterfaces";

export interface FlightsResponse {
    content: Flight[];
    totalPages: number;
    number: number;
}