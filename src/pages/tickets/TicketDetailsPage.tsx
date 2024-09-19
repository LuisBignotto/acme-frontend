import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { getTicketById, getMessagesByTicketId, addMessageToTicket } from "../../services/ticket-service/ticketService";
import { Ticket, Message, MessageCreate } from "@/interfaces/ticket-interfaces/ticket-interfaces";
import MessageList from "./components/MessageList";
import MessageForm from "./components/MessageForm";
import { Button } from "@/components/ui/button";

export function TicketDetailsPage() {
    const { ticketId } = useParams<{ ticketId: string }>();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState<Ticket | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const { toast } = useToast();

    const fetchTicketDetails = async () => {
        setLoading(true);
        try {
            const ticketData: Ticket = await getTicketById(Number(ticketId));
            setTicket(ticketData);
            const messagesData: Message[] = await getMessagesByTicketId(Number(ticketId));
            setMessages(messagesData);
        } catch (error) {
            console.error("Erro ao buscar detalhes do ticket:", error);
            toast({
                variant: "destructive",
                title: "Falha ao buscar detalhes do ticket!",
                description: "Ocorreu um erro ao buscar os detalhes do ticket.",
            });
        } finally {
            setLoading(false);
        }
    };

    const handleAddMessage = async (messageContent: string) => {
        try {
            const session = JSON.parse(localStorage.getItem("session") || "{}");
            
            const loggedUserId = session.userId;
    
            const newMessage: MessageCreate = {
                senderId: loggedUserId,
                message: messageContent
            };
    
            const addedMessage = await addMessageToTicket(Number(ticketId), newMessage);
            setMessages([...messages, addedMessage]);
    
            toast({
                variant: "success",
                title: "Mensagem adicionada com sucesso!",
            });
        } catch (error) {
            console.error("Erro ao adicionar mensagem:", error);
            toast({
                variant: "destructive",
                title: "Erro ao adicionar mensagem!",
            });
        }
    };

    useEffect(() => {
        fetchTicketDetails();
    }, [ticketId]);

    const handleBack = () => {
        navigate(-1);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full flex-grow overflow-auto py-12 px-12">
                <LoaderCircle size={64} className="animate-spin text-darkblue" />
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full overflow-hidden py-12 px-12">
            {ticket && (
                <>
                    <Button onClick={handleBack} className="w-20 p-2">Voltar</Button>
                    <div className="flex flex-col flex-grow overflow-hidden">
                        <MessageList messages={messages} userId={Number(ticket.userId)} />
                        <MessageForm onSave={handleAddMessage} />
                    </div>
                </>
            )}
        </div>
    );
}
