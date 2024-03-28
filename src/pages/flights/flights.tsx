import { Button } from "@/components/ui/button";
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { deleteFlight, getFlights } from "@/services/api";
import { useEffect, useState } from "react";
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Flight, FlightsResponse } from "@/interfaces/FlightInterfaces";
import { Link } from "react-router-dom";
import { LoaderCircle } from "lucide-react";

export function FlightsPage() {

    const [flights, setFlights] = useState<Flight[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [selectedFlightId, setSelectedFlightId] = useState<string | null>(null);

    const fetchFlights = async () => {
        setLoading(true);
        try {
            const data: FlightsResponse = await getFlights(currentPage);
            setFlights(data.content);
            setTotalPages(data.totalPages);
            setCurrentPage(data.number);
            setError('');
        } catch (error) {
            setError('Ocorreu um erro ao buscar os voos.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFlights();
    }, [currentPage]);

    const handleDeleteFlight = async () => {
        if (!selectedFlightId) return;

        try {
            console.log(selectedFlightId)
            await deleteFlight(selectedFlightId);
            setSelectedFlightId(null);
            await fetchFlights();
        } catch (error) {
            setError('Ocorreu um erro ao deletar o voo.');
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

    if (error) {
        return <div>{error}</div>;
    }

    console.log(flights);

    return (
        <div className="flex-grow overflow-auto py-12 px-12">
            <div className="mb-4">
                <Link to="./create">
                    <Button>Criar Novo Voo</Button>
                </Link>
            </div>
            <Table className="rounded-lg overflow-hidden min-w-screen-md shadow-lg">
                <TableHeader className="bg-gray-100">
                    <TableRow>
                        <TableHead className="w-[100px] px-4 py-2">Tag</TableHead>
                        <TableHead className="px-4 py-2">Data de Saída</TableHead>
                        <TableHead className="px-4 py-2">Data de Chegada</TableHead>
                        <TableHead className="px-4 py-2">Aeroporto de Saida</TableHead>
                        <TableHead className="px-4 py-2">Aeroporto de Chegada</TableHead>
                        <TableHead className="px-4 py-2">Opções</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {flights.map((flight) => (
                        <TableRow key={flight.id} className="hover:bg-gray-100">
                            <TableCell className="font-medium px-4 py-2">{flight.flightNumber}</TableCell>
                            <TableCell className="px-4 py-2">{format(parseISO(flight.departureDate), 'dd/MM/yyyy HH:mm', { locale: ptBR })}</TableCell>
                            <TableCell className="px-4 py-2">{format(parseISO(flight.arrivalDate), 'dd/MM/yyyy HH:mm', { locale: ptBR })}</TableCell>
                            <TableCell className="px-4 py-2">{flight.departureAirport}</TableCell>
                            <TableCell className="px-4 py-2">{flight.arrivalAirport}</TableCell>
                            <TableCell className="px-4 py-2 flex space-x-2">
                                <Link to={`/flights/${flight.id}`}>
                                    <Button>
                                        Ver Bagagens
                                    </Button>
                                </Link>
                                <div onClick={() => setSelectedFlightId(flight.id)}>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button className="bg-red-700 hover:bg-red-600">
                                                Apagar
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                                            <AlertDialogDescription>
                                                Tem certeza de que deseja excluir este voo?
                                            </AlertDialogDescription>
                                            <AlertDialogFooter>
                                                <AlertDialogAction onClick={() => setSelectedFlightId(null)}>
                                                    Cancelar
                                                </AlertDialogAction>
                                                <AlertDialogAction onClick={() => handleDeleteFlight()}>
                                                    Confirmar
                                                </AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <div className="mt-6 flex justify-center">
                <Pagination className="text-black">
                    <PaginationContent>
                        {currentPage > 0 && (
                            <PaginationItem>
                                <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage - 1); }} />
                            </PaginationItem>
                        )}
                        {Array.from({ length: totalPages }, (_, index) => (
                            <PaginationItem key={index}>
                                <PaginationLink href="#" isActive={index === currentPage} onClick={(e) => { e.preventDefault(); handlePageChange(index); }}>
                                    {index + 1}
                                </PaginationLink>
                            </PaginationItem>
                        ))}
                        {currentPage < totalPages - 1 && (
                            <PaginationItem>
                                <PaginationNext href="#" onClick={(e) => { e.preventDefault(); handlePageChange(currentPage + 1); }} />
                            </PaginationItem>
                        )}
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    )
}



