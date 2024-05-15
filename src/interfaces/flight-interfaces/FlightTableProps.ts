import { Flight } from "./FlightInterfaces";

export interface FlightTableProps {
    flights: Flight[];
    onDelete: (id: string) => void;
    onEdit: (id: string) => void;
}
