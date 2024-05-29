import React, { useState } from "react";
import { Ticket } from "@/interfaces/ticket-interfaces/ticket-interfaces";

interface TicketDetailsProps {
    ticket: Ticket;
    onSave: (updatedTicket: Ticket) => void;
    onDelete: (ticketId: number) => void;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ ticket, onSave, onDelete }) => {
    const [updatedStatus, setUpdatedStatus] = useState<string>(ticket.status);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setUpdatedStatus(e.target.value);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ ...ticket, status: updatedStatus });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-2">
                <label className="block">Título</label>
                <input
                    type="text"
                    name="title"
                    value={ticket.title}
                    readOnly
                    className="border p-2 w-full bg-gray-100"
                />
            </div>
            <div className="mb-2">
                <label className="block">Descrição</label>
                <textarea
                    name="description"
                    value={ticket.description}
                    readOnly
                    className="border p-2 w-full bg-gray-100"
                ></textarea>
            </div>
            <div className="mb-2">
                <label className="block">Status</label>
                <input
                    type="text"
                    name="status"
                    value={updatedStatus}
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
