import { useEffect, useState } from "react";
import { deleteFlight, getFlights } from "@/services/flights-service/flightsService";
import { Flight } from "@/interfaces/flight-interfaces/FlightInterfaces";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import FlightTable from "./components/flight-table";
import PaginationComponent from "@/components/pagination/pagination-comp";
import { FlightsResponse } from "@/interfaces/flight-interfaces/FlightsResponse";
import { useToast } from "@/components/ui/use-toast";


export function FlightsPage() {
    const [flights, setFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const { toast } = useToast()

    const fetchFlights = async () => {
        setLoading(true);
        try {
            const data: FlightsResponse = await getFlights(currentPage);
            setFlights(data.content);
            setTotalPages(data.totalPages);
            setCurrentPage(data.number);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Falha ao buscar voos!",
                description: "Entre novamente para ver voos.",
            })
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFlights();
    }, [currentPage]);

    const handleDeleteFlight = async (id: string) => {
        try {
            await deleteFlight(id);
            await fetchFlights();
            toast({
                variant: "success",
                title: "Voo apagado com sucesso!",
            })
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erro ao deletar voo!",
                description: "Ainda há bagagens nesse voo.",
            })
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
            <div className="mb-4">
                <Link to="./create">
                    <Button>Criar Novo Voo</Button>
                </Link>
            </div>
            <FlightTable flights={flights} onDelete={handleDeleteFlight} />
            <div className="mt-6 flex justify-center">
                <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}
