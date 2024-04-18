import { Address } from "./address";

export interface User {
    id: string;
    name: string;
    email: string;
    cpf: string;
    password: string;
    phone: string | null;
    role: string;
    address: Address | null;
}