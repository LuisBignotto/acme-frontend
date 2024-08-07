import { Address } from "./address";
import { Baggage } from "./baggage";

export interface User {
    id: number;
    name: string;
    email: string;
    cpf: string;
    phone: string | null;
    address: Address | null;
    role: string;
    baggages?: Baggage[];
}
