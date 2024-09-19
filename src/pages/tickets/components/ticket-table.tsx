import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil } from 'lucide-react';
import { Ticket } from "@/interfaces/ticket-interfaces/ticket-interfaces";

interface TicketTableProps {
    tickets: Ticket[];
    onDelete: (ticketId: number) => void;
    onEdit: (ticket: Ticket) => void;
}

const TicketTable: React.FC<TicketTableProps> = ({ tickets = [], onEdit }) => {
    const navigate = useNavigate();

    const handleOpenTicket = (ticketId: number) => {
        navigate(`/tickets/${ticketId}`);
    };

    return (
        <Table className="rounded-lg overflow-hidden min-w-screen-md shadow-lg">
            <TableHeader className="bg-gray-100">
                <TableRow>
                    <TableHead className="w-[100px] px-4 py-2">ID</TableHead>
                    <TableHead className="px-4 py-2">Título</TableHead>
                    <TableHead className="px-4 py-2">Descrição</TableHead>
                    <TableHead className="px-4 py-2">Status</TableHead>
                    <TableHead className="px-4 py-2">Opções</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {tickets.map((ticket) => (
                    <TableRow key={ticket.id} className="hover:bg-gray-100">
                        <TableCell className="font-medium px-4 py-2">{ticket.id}</TableCell>
                        <TableCell className="px-4 py-2">{ticket.title}</TableCell>
                        <TableCell className="px-4 py-2">{ticket.description}</TableCell>
                        <TableCell className="px-4 py-2">{ticket.status}</TableCell>
                        <TableCell className="px-4 py-2 flex space-x-2">
                            <Button onClick={() => handleOpenTicket(ticket.id)}>
                                Abrir
                            </Button>
                            <Button onClick={() => onEdit(ticket)}>
                                <Pencil size={22} />
                            </Button>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default TicketTable;
