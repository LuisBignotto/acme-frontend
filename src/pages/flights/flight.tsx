import { FormEvent, useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { getFlight } from "@/services/flights-service/flightsService";
import { createBaggage, deleteBaggage } from "@/services/baggage-service/baggageService";
import { Bagages } from "@/interfaces/baggage-interfaces/Bagages";
import BagageTable from "../baggages/components/baggage-table";
import { Button } from "@/components/ui/button";
import SelectStatus from '../baggages/components/select-status';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogClose } from '@/components/ui/dialog';
import { BagageFormState } from "@/interfaces/baggage-interfaces/BagageFormState";
import { Label } from "@/components/ui/label";
import FormField from "@/components/form-field/form-field";

const fieldLabels: { [K in keyof Omit<BagageFormState, 'isValid' | 'tag' | 'flightId'>]: string } = {
    userEmail: "User Email",
    color: "Cor",
    weight: "Peso",
    status: "Status",
    lastSeenLocation: "Última Localização",
};

const statusOptions = [
    { value: "DESPACHADA", label: "DESPACHADA" },
];

export function FlightPage() {
    const [loading, setLoading] = useState<boolean>(true);
    const [baggages, setBaggages] = useState<Bagages[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [state, setState] = useState<BagageFormState>({
        userEmail: "",
        tag: "",
        color: "",
        weight: "",
        status: "",
        lastSeenLocation: "",
        flightId: "",
        isValid: true,
    });
    const { flightId } = useParams<{ flightId: string }>();
    const { toast } = useToast()

    const fetchFlight = async () => {
        setLoading(true);
        try {
            if (!flightId) {
                throw new Error("ID do voo não especificado.");
            }
            const data = await getFlight(flightId);
            setBaggages(data.baggage);
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

    const handleChange = (field: keyof Omit<BagageFormState, 'tag' | 'flightId'>, value: string) => {
        setState({ ...state, [field]: value });
    };

    const generateTag = (): string => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let tag = '';
        for (let i = 0; i < 6; i++) {
            tag += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return tag;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (state.isValid && flightId) {
            const tag = generateTag();
            const baggageData = {
                userEmail: state.userEmail,
                tag,
                color: state.color,
                weight: parseFloat(state.weight),
                status: state.status,
                lastSeenLocation: state.lastSeenLocation,
                flightId,
            };

            await createBaggage(baggageData)
                .then((newBaggage) => {
                    toast({
                        variant: "success",
                        title: "Bagagem criada com sucesso!",
                    });
                    setBaggages([...baggages, newBaggage]);
                    setIsOpen(false);
                })
                .catch(() => {
                    toast({
                        variant: "destructive",
                        title: "Erro ao criar bagagem!",
                    });
                    setState({ ...state, isValid: false });
                });
        }
    };

    const handleDeleteBaggage = async (id: string) => {
        try {
            await deleteBaggage(id);
            await fetchFlight();
            toast({
                variant: "success",
                title: "Bagagem apagada com sucesso!",
            })
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erro ao apagar bagagem!",
            })
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
                        <form onSubmit={handleSubmit}>
                            <div className="grid gap-4">
                                {(Object.keys(fieldLabels) as (keyof Omit<BagageFormState, 'isValid' | 'tag' | 'flightId'>)[]).map((field) => (
                                    <div key={field} className="grid gap-2">
                                        <Label htmlFor={field}>{fieldLabels[field]}</Label>
                                        {field === 'status' ? (
                                            <SelectStatus
                                                options={statusOptions}
                                                value={state[field] || ""}
                                                onChange={(value) => handleChange(field, value)}
                                                placeholder="Selecione o status"
                                            />
                                        ) : (
                                            <FormField
                                                field={field}
                                                value={state[field]}
                                                onChange={(value) => handleChange(field, value)}
                                                type={'text'}
                                                placeholder={fieldLabels[field]}
                                                placeholderHour={""}
                                                placeholderMinute={""}
                                            />
                                        )}
                                    </div>
                                ))}
                            </div>
                            <DialogFooter>
                                <Button type="submit" className="mt-4">Criar Bagagem</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>
            <BagageTable bagages={baggages} onDelete={handleDeleteBaggage} />
        </div>
    );
}
