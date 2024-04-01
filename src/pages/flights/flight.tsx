import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom'; 
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { getFlight } from "@/services/flights-service/flightsService";
import { Bagages } from "@/interfaces/flight-interfaces/Bagages";
import BagageTable from "./components/baggage-table"; 

export function FlightPage() {
    const [loading, setLoading] = useState<boolean>(true);
    const [baggages, setBaggages] = useState<Bagages[]>([]);
    const { toast } = useToast()
    const { flightId } = useParams<{ flightId: string }>();

    const fetchFlight = async () => {
        setLoading(true);
        try {
            if (!flightId) {
                throw new Error("ID do voo não especificado.");
            }
            const data: Bagages[] = await getFlight(flightId); 
            setBaggages(data);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Falha ao buscar as bagagens do voo!",
                description: "Entre novamente para ver as bagagens.",
            })
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchFlight();
    }, [flightId]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full flex-grow overflow-auto py-12 px-12">
                <LoaderCircle size={64} className="animate-spin text-darkblue" />
            </div>
        );
    }

    if (!flightId) {
        return <div>ID do voo não especificado.</div>;
    }

    return (
        <div className="flex-grow overflow-auto py-12 px-12">
            <BagageTable bagages={baggages} onDelete={(id: string) => console.log(`Bagagem ${id} deletada`)} />
        </div>
    );
}
