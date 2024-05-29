export interface TicketCreate {
    userId: number;
    title: string;
    description: string;
}

export interface MessageCreate {
    senderId: number;
    message: string;
}

export interface Ticket {
    id: number;
    userId: number;
    title: string;
    description: string;
    status: string;
    createdAt: string; 
    updatedAt: string; 
    messages?: Message[];
}

export interface Message {
    id: number;
    ticketId: number;
    senderId: number;
    message: string;
    timestamp: string;
}

export interface TicketsResponse {
    content: Ticket[];
    totalPages: number;
    number: number;
}
