export interface Ticket {
    id: number;
    userId: number;
    title: string;
    description: string;
    status: string;
}

export interface TicketCreate {
    userId: number;
    title: string;
    description: string;
    status: string;
}

export interface TicketsResponse {
    content: Ticket[];
    totalPages: number;
    number: number;
}
