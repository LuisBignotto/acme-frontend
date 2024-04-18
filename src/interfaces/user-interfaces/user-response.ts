import { User } from "./user";

export interface UsersResponse {
    content: User[];
    totalPages: number;
    number: number;
}