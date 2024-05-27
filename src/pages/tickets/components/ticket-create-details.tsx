import React, { useState } from "react";
import { TicketCreate } from "@/interfaces/ticket-interfaces/ticket-interfaces";

interface TicketCreateDetailsProps {
    onSave: (newTicket: TicketCreate) => void;
}

const TicketCreateDetails: React.FC<TicketCreateDetailsProps> = ({ onSave }) => {
    const [newTicket, setNewTicket] = useState<TicketCreate>({
        userId: 0,
        title: '',
        description: '',
        status: 'OPEN'
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;

        setNewTicket({
            ...newTicket,
            [name]: name === 'userId' ? parseInt(value, 10) : value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(newTicket);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-2">
                <label className="block">User ID</label>
                <input
                    type="number"
                    name="userId"
                    value={newTicket.userId}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
            </div>
            <div className="mb-2">
                <label className="block">Título</label>
                <input
                    type="text"
                    name="title"
                    value={newTicket.title}
                    onChange={handleChange}
                    className="border p-2 w-full"
                />
            </div>
            <div className="mb-2">
                <label className="block">Descrição</label>
                <textarea
                    name="description"
                    value={newTicket.description}
                    onChange={handleChange}
                    className="border p-2 w-full"
                ></textarea>
            </div>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded">Criar Ticket</button>
        </form>
    );
};

export default TicketCreateDetails;
