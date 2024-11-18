import { useEffect, useState, useRef } from "react";
import { useParams } from 'react-router-dom';
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { getBaggagesByFlight, createBaggage, deleteBaggage, countBaggage } from "@/services/baggage-service/baggageService";
import { Baggages } from "@/interfaces/baggage-interfaces/Baggages";
import BaggageTable from "../baggages/components/baggage-table";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { User } from "@/interfaces/user-interfaces/user";
import BaggageCreateDetails from "../baggages/components/baggage-create";

export function FlightPage() {
    const [loading, setLoading] = useState<boolean>(true);
    const [baggages, setBaggages] = useState<Baggages[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [baggageCount, setBaggageCount] = useState<number>(0);
    const [discrepancy, setDiscrepancy] = useState<boolean>(false); 
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const { flightId } = useParams<{ flightId: string }>();
    const { toast } = useToast();

    const fetchBaggages = async () => {
        setLoading(true);
        try {
            if (!flightId) {
                throw new Error("ID do voo não especificado.");
            }
            const response = await getBaggagesByFlight(flightId);
            setBaggages(response || []);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Falha ao buscar as bagagens do voo!",
                description: "Ocorreu um erro ao buscar as bagagens.",
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchBaggageCount = async () => {
        if (!flightId) return;
        const count = await countBaggage(flightId); 
        setBaggageCount(count);
    };

    useEffect(() => {
        fetchBaggages();
        fetchBaggageCount();

        if (!intervalRef.current) {
            intervalRef.current = setInterval(() => {
                fetchBaggageCount();
            }, 3000);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
                intervalRef.current = null;
            }
        };
    }, [flightId]);

    useEffect(() => {
        setDiscrepancy(baggageCount > baggages.length);
    }, [baggageCount, baggages.length]);

    const handleSaveBaggage = async (baggageData: {
        userId: number;
        tag: string;
        color: string;
        weight: number;
        statusId: number;
        lastLocation: string;
        flightId: number;
        trackers: User[];
    }) => {
        try {
            const newBaggage = await createBaggage(baggageData);
            toast({
                variant: "success",
                title: "Bagagem criada com sucesso!",
            });
            setBaggages([...baggages, newBaggage]);
            setIsOpen(false);
            await fetchBaggageCount();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erro ao criar bagagem!",
            });
        }
    };

    const handleDeleteBaggage = async (id: number) => {
        try {
            await deleteBaggage(id);
            await fetchBaggages();
            toast({
                variant: "success",
                title: "Bagagem apagada com sucesso!",
            });
            await fetchBaggageCount();
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erro ao apagar bagagem!",
            });
        }
    };

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
            <div className="mb-4">
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button>Adicionar Bagagem</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Criar Nova Bagagem</DialogTitle>
                        </DialogHeader>
                        <BaggageCreateDetails onSave={handleSaveBaggage} showFlightId={false} />
                    </DialogContent>
                </Dialog>
            </div>
            {discrepancy && (
                <div className="bg-red-100 text-red-800 p-4 mb-4 rounded-md">
                    <strong>Atenção:</strong> A contagem de malas ({baggageCount}) é maior do que o número de bagagens registradas ({baggages.length}). Verifique possíveis erros.
                </div>
            )}
            <BaggageTable baggages={baggages} onDelete={handleDeleteBaggage} />
            
            <div className="mt-8 text-center">
                <h2 className="text-xl font-bold">Total de malas contadas: {baggageCount}</h2>
            </div>
        </div>
    );
}
