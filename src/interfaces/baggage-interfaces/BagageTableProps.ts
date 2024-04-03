import { Bagages } from "./Bagages";

export interface BagageTableProps {
    bagages: Bagages[];
    onDelete: (id: string) => void; 
}