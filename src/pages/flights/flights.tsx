import { useEffect, useReducer } from "react";
import { deleteFlight, getFlightByTag, getFlights, getFlight } from "@/services/flights-service/flightsService";
import { Flight } from "@/interfaces/flight-interfaces/FlightInterfaces";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import FlightTable from "./components/flight-table";
import PaginationComponent from "@/components/pagination/pagination-comp";
import { FlightsResponse } from "@/interfaces/flight-interfaces/FlightsResponse";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CreateFlightForm } from "./components/create";
import { UpdateFlightForm } from "./components/update";
import { SearchFlightForm } from "./components/search-flight-form";

interface State {
    flights: Flight[];
    loading: boolean;
    currentPage: number;
    totalPages: number;
    isOpen: boolean;
    isSearchOpen: boolean;
    isEditOpen: boolean;
    currentFlight: Flight | null;
}

type Action =
    | { type: 'SET_FLIGHTS'; payload: FlightsResponse }
    | { type: 'SET_LOADING'; payload: boolean }
    | { type: 'SET_CURRENT_PAGE'; payload: number }
    | { type: 'SET_TOTAL_PAGES'; payload: number }
    | { type: 'SET_IS_OPEN'; payload: boolean }
    | { type: 'SET_IS_SEARCH_OPEN'; payload: boolean }
    | { type: 'SET_IS_EDIT_OPEN'; payload: boolean }
    | { type: 'SET_CURRENT_FLIGHT'; payload: Flight | null };

const initialState: State = {
    flights: [],
    loading: true,
    currentPage: 0,
    totalPages: 0,
    isOpen: false,
    isSearchOpen: false,
    isEditOpen: false,
    currentFlight: null,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'SET_FLIGHTS':
            return {
                ...state,
                flights: action.payload.content,
                totalPages: action.payload.totalPages,
                currentPage: action.payload.number,
                loading: false,
            };
        case 'SET_LOADING':
            return { ...state, loading: action.payload };
        case 'SET_CURRENT_PAGE':
            return { ...state, currentPage: action.payload };
        case 'SET_TOTAL_PAGES':
            return { ...state, totalPages: action.payload };
        case 'SET_IS_OPEN':
            return { ...state, isOpen: action.payload };
        case 'SET_IS_SEARCH_OPEN':
            return { ...state, isSearchOpen: action.payload };
        case 'SET_IS_EDIT_OPEN':
            return { ...state, isEditOpen: action.payload };
        case 'SET_CURRENT_FLIGHT':
            return { ...state, currentFlight: action.payload };
        default:
            return state;
    }
}

export function FlightsPage() {
    const [state, dispatch] = useReducer(reducer, initialState);
    const navigate = useNavigate();
    const { toast } = useToast();

    const fetchFlights = async () => {
        dispatch({ type: 'SET_LOADING', payload: true });
        try {
            const data: FlightsResponse = await getFlights(state.currentPage);
            dispatch({ type: 'SET_FLIGHTS', payload: data });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Falha ao buscar voos!",
                description: "Entre novamente para ver voos.",
            });
        }
    };

    useEffect(() => {
        fetchFlights();
    }, [state.currentPage]);

    const handleDeleteFlight = async (id: string) => {
        try {
            await deleteFlight(id);
            await fetchFlights();
            toast({
                variant: "success",
                title: "Voo apagado com sucesso!",
            });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erro ao deletar voo!",
                description: "Ainda há bagagens nesse voo.",
            });
        }
    };

    const handlePageChange = (newPage: number) => {
        dispatch({ type: 'SET_CURRENT_PAGE', payload: newPage });
    };

    const handleSearch = async (searchTerm: string) => {
        try {
            const flight = await getFlightByTag(searchTerm);
            if (flight) {
                navigate(`/flights/${flight.id}`);
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Voo não encontrado",
                description: "Nenhum voo encontrado com a tag fornecida.",
            });
        }
        dispatch({ type: 'SET_IS_SEARCH_OPEN', payload: false });
    };

    const handleEditFlight = async (id: string) => {
        try {
            const response = await getFlight(id);
            dispatch({ type: 'SET_CURRENT_FLIGHT', payload: response.data });
            dispatch({ type: 'SET_IS_EDIT_OPEN', payload: true });
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erro ao buscar voo!",
                description: "Não foi possível buscar os detalhes do voo.",
            });
        }
    };

    if (state.loading) {
        return (
            <div className="flex items-center justify-center h-full flex-grow overflow-auto py-12 px-12">
                <LoaderCircle size={64} className="animate-spin text-darkblue" />
            </div>
        );
    }

    return (
        <div className="flex-grow overflow-auto py-12 px-12">
            <div className="mb-4 flex space-x-1">
                <Dialog open={state.isOpen} onOpenChange={(isOpen) => dispatch({ type: 'SET_IS_OPEN', payload: isOpen })}>
                    <DialogTrigger asChild>
                        <Button>
                            Criar Voo
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Criar Novo Voo</DialogTitle>
                        </DialogHeader>
                        <CreateFlightForm 
                            onClose={() => {
                                dispatch({ type: 'SET_IS_OPEN', payload: false });
                                fetchFlights(); 
                            }} 
                        />
                    </DialogContent>
                </Dialog>
                <Dialog open={state.isSearchOpen} onOpenChange={(isSearchOpen) => dispatch({ type: 'SET_IS_SEARCH_OPEN', payload: isSearchOpen })}>
                    <DialogTrigger asChild>
                        <Button>
                            Buscar Voo
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Buscar Voo</DialogTitle>
                        </DialogHeader>
                        <SearchFlightForm onSearch={handleSearch} />
                    </DialogContent>
                </Dialog>
            </div>
            <FlightTable flights={state.flights} onDelete={handleDeleteFlight} onEdit={handleEditFlight} />
            <div className="mt-6 flex justify-center">
                <PaginationComponent currentPage={state.currentPage} totalPages={state.totalPages} onPageChange={handlePageChange} />
            </div>
            <Dialog open={state.isEditOpen} onOpenChange={(isEditOpen) => dispatch({ type: 'SET_IS_EDIT_OPEN', payload: isEditOpen })}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Editar Voo</DialogTitle>
                    </DialogHeader>
                    {state.currentFlight && (
                        <UpdateFlightForm 
                            flightId={state.currentFlight.id} 
                            onClose={() => {
                                dispatch({ type: 'SET_IS_EDIT_OPEN', payload: false });
                                fetchFlights();
                            }} 
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}
