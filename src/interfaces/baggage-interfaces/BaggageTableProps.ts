import { Baggages } from "./Baggages";

export interface BaggageTableProps {
    baggages: Baggages[];
    onDelete: (id: number) => void; 
    onEdit?: (baggage: Baggages) => void; 
}