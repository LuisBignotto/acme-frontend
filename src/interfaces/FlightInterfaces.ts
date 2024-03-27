export interface Flight {
  id: string;
  flightNumber: string;
  departureDate: string;
  arrivalDate: string;
  departureAirport: string;
  arrivalAirport: string;
}

export interface FlightsResponse {
  content: Flight[];
  totalPages: number;
  number: number;
}
  