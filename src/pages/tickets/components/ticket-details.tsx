import React, { useState } from "react";
import { Ticket } from "@/interfaces/ticket-interfaces/ticket-interfaces";

interface TicketDetailsProps {
    ticket: Ticket;
    onSave: (updatedTicket: Ticket) => void;
    onDelete: (ticketId: number) => void;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ ticket, onSave, onDelete }) => {
    const [updatedTicket, setUpdatedTicket] = useState<Ticket>(ticket);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setUpdatedTicket({ ...updatedTicket, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(updatedTicket);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-2">
                <label className="block">Título</label>
                <input
                    type="text"
                    name="title"
                    value={updatedTicket.title}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
            </div>
            <div className="mb-2">
                <label className="block">Descrição</label>
                <textarea
                    name="description"
                    value={updatedTicket.description}
                    onChange={handleChange}
                    className="border p-2 w-full"
                ></textarea>
            </div>
            <div className="mb-2">
                <label className="block">Status</label>
                <input
                    type="text"
                    name="status"
                    value={updatedTicket.status}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded mr-2">Salvar</button>
            <button type="button" onClick={() => onDelete(ticket.id)} className="bg-red-500 text-white p-2 rounded">Excluir</button>
        </form>
    );
};

export default TicketDetails;
