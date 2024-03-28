export interface CreateFlightFormState {
    flightNumber: string;
    departureDate: string;
    departureTime: string;
    arrivalDate: string;
    arrivalTime: string;
    departureAirport: string;
    arrivalAirport: string;
    isValid: boolean;
}