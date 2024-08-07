import { useEffect, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getAllTickets, updateTicket, deleteTicket } from "../../services/ticket-service/ticketService";
import TicketTable from "./components/ticket-table";
import TicketDetails from "./components/ticket-details";
import PaginationComponent from "@/components/pagination/pagination-comp";
import { Ticket, TicketsResponse } from "@/interfaces/ticket-interfaces/ticket-interfaces";

export function TicketsPage() {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
    const [isTicketDetailsOpen, setIsTicketDetailsOpen] = useState<boolean>(false);
    const { toast } = useToast();

    const fetchTickets = async () => {
        setLoading(true);
        try {
            const data: TicketsResponse = await getAllTickets(currentPage, 10, "id");
            setTickets(data.content);
            setTotalPages(data.totalPages);
            setCurrentPage(data.number);
        } catch (error) {
            console.error("Erro ao buscar tickets:", error);
            toast({
                variant: "destructive",
                title: "Falha ao buscar tickets!",
                description: "Ocorreu um erro ao buscar os tickets.",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTickets();
    }, [currentPage]);

    const handleDeleteTicket = async (ticketId: number) => {
        try {
            await deleteTicket(ticketId);
            const updatedTickets = tickets.filter((ticket) => ticket.id !== ticketId);
            setTickets(updatedTickets);
            toast({
                variant: "success",
                title: "Ticket excluído com sucesso!",
            });
        } catch (error) {
            console.error("Erro ao excluir ticket:", error);
            toast({
                variant: "destructive",
                title: "Erro ao excluir ticket!",
            });
        }
    };

    const handleEditTicket = (ticket: Ticket) => {
        setSelectedTicket(ticket);
        setIsTicketDetailsOpen(true);
    };

    const handleUpdateTicket = async (updatedTicket: Ticket) => {
        try {
            await updateTicket(updatedTicket.id, updatedTicket.status);
            const updatedTickets = tickets.map((ticket) =>
                ticket.id === updatedTicket.id ? { ...ticket, status: updatedTicket.status } : ticket
            );
            setTickets(updatedTickets);
            setIsTicketDetailsOpen(false);
            toast({
                variant: "success",
                title: "Ticket atualizado com sucesso!",
            });
        } catch (error) {
            console.error("Erro ao atualizar ticket:", error);
            toast({
                variant: "destructive",
                title: "Erro ao atualizar ticket!",
            });
        }
    };

    const handlePageChange = (newPage: number) => {
        setCurrentPage(newPage);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full flex-grow overflow-auto py-12 px-12">
                <LoaderCircle size={64} className="animate-spin text-darkblue" />
            </div>
        );
    }

    return (
        <div className="flex-grow overflow-auto py-12 px-12">
            <div className="mb-4 flex space-x-1">
                <Dialog open={isTicketDetailsOpen} onOpenChange={setIsTicketDetailsOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Detalhes do Ticket</DialogTitle>
                        </DialogHeader>
                        {selectedTicket && (
                            <TicketDetails
                                ticket={selectedTicket}
                                onSave={handleUpdateTicket}
                                onDelete={handleDeleteTicket}
                            />
                        )}
                    </DialogContent>
                </Dialog>
            </div>
            <TicketTable
                tickets={tickets}
                onDelete={handleDeleteTicket}
                onEdit={handleEditTicket}
            />
            <div className="mt-6 flex justify-center">
                <PaginationComponent
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            </div>
        </div>
    );
}

