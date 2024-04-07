import { Baggages } from "./Baggages";

export interface BaggageTableProps {
    baggages: Baggages[];
    onDelete: (id: string) => void; 
    onEdit?: (baggage: Baggages) => void; 
}