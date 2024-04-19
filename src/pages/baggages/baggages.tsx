import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Baggages } from "@/interfaces/baggage-interfaces/Baggages";
import BaggageTable from "./components/baggage-table";
import { SearchBaggageByTag } from "./components/search-by-tag";
import { SearchBaggageByEmail } from "./components/search-by-email";
import { getAllBaggages, deleteBaggage, getBaggageByTag, getBaggagesByEmail, updateBaggage, createBaggage } from "../../services/baggage-service/baggageService";
import BaggageDetails from "./components/baggage-details";
import { getFlight, getFlightByTag } from "@/services/flights-service/flightsService";
import BaggageCreateDetails from "./components/baggage-create";
import { getUserByEmail } from "@/services/user-service/userService";
import { BaggageFormState } from "@/interfaces/baggage-interfaces/BaggageFormState";
import BaggageSearchResults from "./components/baggage-list";

export function BaggagesPage() {
    const [baggages, setBaggages] = useState<Baggages[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isCreateOpen, setIsCreateOpen] = useState(false);
    const [isSearchByTagOpen, setIsSearchByTagOpen] = useState(false);
    const [isSearchByEmailOpen, setIsSearchByEmailOpen] = useState(false);
    const [foundBaggage, setFoundBaggage] = useState<Baggages | null>(null);
    const [isBaggageDetailsOpen, setIsBaggageDetailsOpen] = useState(false);
    const [foundBaggagesByEmail, setFoundBaggagesByEmail] = useState<Baggages[]>([]);
    const [isEditBaggageOpen, setIsEditBaggageOpen] = useState(false);
    const [baggageToDelete, setBaggageToDelete] = useState<string | null>(null);

    const { toast } = useToast();

    useEffect(() => {
        const fetchBaggages = async () => {
            try {
                const data = await getAllBaggages();
                setBaggages(data);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar bagagens:", error);
                setLoading(false);
            }
        };

        fetchBaggages();
    }, []);

    const generateTag = (): string => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let tag = '';
        for (let i = 0; i < 6; i++) {
            tag += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return tag;
    };

    const handleCreateBaggage = async (newBaggage: BaggageFormState) => {
        try {
            const userResponse = await getUserByEmail(newBaggage.userEmail);

            if (!userResponse.data) {
                toast({
                    variant: "destructive",
                    title: "Erro ao criar bagagem",
                    description: "Usuário não encontrado com o e-mail fornecido.",
                });
                return;
            }

            const userId = userResponse.data.userId;

            const flightResponse = await getFlightByTag(newBaggage.flightId);

            if (!flightResponse) {
                toast({
                    variant: "destructive",
                    title: "Erro ao criar bagagem",
                    description: "Voo não encontrado com a tag fornecida.",
                });
                return;
            }

            const flightId = flightResponse.data.id;

            const tag = generateTag();

            const baggageData = {
                ...newBaggage,
                userId: userId,
                flightId: flightId,
                tag: tag,
            };

            const response = await createBaggage(baggageData);

            if (response) {
                setBaggages([...baggages, response]);
                setIsCreateOpen(false);
                toast({
                    variant: "success",
                    title: "Bagagem criada com sucesso!",
                });
            }
        } catch (error) {
            console.error("Erro ao criar bagagem:", error);
            toast({
                variant: "destructive",
                title: "Erro ao criar bagagem!",
            });
        }
    };

    const handleDeleteBaggage = async (baggageId: string) => {
        setBaggageToDelete(baggageId);
        try {
            await deleteBaggage(baggageId);
            const updatedBaggages = baggages.filter((baggage) => baggage.id !== baggageId);
            setBaggages(updatedBaggages);
            const updatedFoundBaggages = foundBaggagesByEmail.filter((baggage) => baggage.id !== baggageId);
            setFoundBaggagesByEmail(updatedFoundBaggages);
            setBaggageToDelete(null);
            toast({
                variant: "success",
                title: "Bagagem apagada com sucesso!",
            });
        } catch (error) {
            console.error("Erro ao excluir bagagem:", error);
            toast({
                variant: "destructive",
                title: "Erro ao excluir bagagem!",
            });
        }
    };

    const handleSearchByTag = async (searchTerm: string) => {
        try {
            const response = await getBaggageByTag(searchTerm);
            const baggage: Baggages = response.data;

            if (baggage) {
                setFoundBaggage(baggage);
                setIsEditBaggageOpen(true);
                toast({
                    variant: "success",
                    title: "Bagagem encontrada com sucesso!",
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Bagagem não encontrada",
                    description: "Nenhuma bagagem encontrada com a tag fornecida.",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erro ao buscar bagagem",
                description: "Tente novamente mais tarde.",
            });
        }
        setIsSearchByTagOpen(false);
    };

    const handleSearchByEmail = async (searchTerm: string) => {
        try {
            const baggages = await getBaggagesByEmail(searchTerm);
            if (baggages.data.length > 0) {
                setFoundBaggagesByEmail(baggages.data);
                setIsBaggageDetailsOpen(true);
                toast({
                    variant: "success",
                    title: "Bagagens encontradas com sucesso!",
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Nenhuma bagagem encontrada",
                    description: "Nenhuma bagagem encontrada com o email fornecido.",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erro ao buscar bagagens",
                description: "Tente novamente mais tarde.",
            });
        }
        setIsSearchByEmailOpen(false);
    };

    const handleEditBaggage = (baggageToEdit: Baggages) => {
        setFoundBaggage(baggageToEdit);
        setIsEditBaggageOpen(true);
        setIsSearchByEmailOpen(false);
        setIsBaggageDetailsOpen(false);
    };

    const handleUpdateBaggage = async (updatedBaggage: Baggages) => {
        try {
            const flight = await getFlight(updatedBaggage.flightId);
            if (!flight) {
                toast({
                    variant: "destructive",
                    title: "Erro ao atualizar bagagem",
                    description: "Não há voos com o ID fornecido.",
                });
                return;
            }

            await updateBaggage(updatedBaggage.id, updatedBaggage);
            const updatedBaggages = baggages.map(baggage => baggage.id === updatedBaggage.id ? updatedBaggage : baggage);
            setBaggages(updatedBaggages);
            setIsBaggageDetailsOpen(false);
            toast({
                variant: "success",
                title: "Bagagem atualizada com sucesso!",
            });
        } catch (error) {
            console.error("Erro ao atualizar bagagem:", error);
            toast({
                variant: "destructive",
                title: "Erro ao atualizar bagagem!",
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

    return (
        <div className="flex-grow overflow-auto py-12 px-12">
            <div className="mb-4 flex space-x-1">
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button>Criar Bagagem</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Criar Bagagem</DialogTitle>
                        </DialogHeader>
                        <BaggageCreateDetails onSave={handleCreateBaggage} />
                    </DialogContent>
                </Dialog>
                <Dialog open={isSearchByTagOpen} onOpenChange={setIsSearchByTagOpen}>
                    <DialogTrigger asChild>
                        <Button>Buscar Por Tag</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Buscar por Tag</DialogTitle>
                        </DialogHeader>
                        <SearchBaggageByTag onSearch={handleSearchByTag} />
                    </DialogContent>
                </Dialog>
                <Dialog open={isEditBaggageOpen} onOpenChange={setIsEditBaggageOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Editar Bagagem</DialogTitle>
                        </DialogHeader>
                        {foundBaggage && <BaggageDetails onSave={handleUpdateBaggage} onDelete={handleDeleteBaggage} baggage={foundBaggage} />}
                    </DialogContent>
                </Dialog>
                <Dialog open={isSearchByEmailOpen} onOpenChange={setIsSearchByEmailOpen}>
                    <DialogTrigger asChild>
                        <Button>Buscar por Email</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Buscar por Email</DialogTitle>
                        </DialogHeader>
                        <SearchBaggageByEmail onSearch={handleSearchByEmail} />
                    </DialogContent>
                </Dialog>
                <Dialog open={isBaggageDetailsOpen} onOpenChange={setIsBaggageDetailsOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Bagagens</DialogTitle>
                        </DialogHeader>
                        <BaggageSearchResults
                            baggages={foundBaggagesByEmail}
                            onEdit={handleEditBaggage}
                            onDelete={handleDeleteBaggage}
                        />
                    </DialogContent>
                </Dialog>
            </div>
            <BaggageTable
                baggages={baggages}
                onDelete={handleDeleteBaggage}
                onEdit={(baggage) => handleEditBaggage(baggage)}
            />
        </div>
    );
}
