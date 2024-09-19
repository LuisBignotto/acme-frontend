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
import BaggageCreateDetails from "./components/baggage-create";
import BaggageSearchResults from "./components/baggage-list";
import PaginationComponent from "@/components/pagination/pagination-comp";
import { User } from "@/interfaces/user-interfaces/user";

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
    const [, setBaggageToDelete] = useState<number | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages] = useState<number>(1);

    const { toast } = useToast();

    useEffect(() => {
        const fetchBaggages = async () => {
            try {
                const data = await getAllBaggages();
                setBaggages(Array.isArray(data) ? data : []);
                setLoading(false);
            } catch (error) {
                setLoading(false);
            }
        };

        fetchBaggages();
    }, [currentPage]);

    const generateTag = (): string => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let tag = '';
        for (let i = 0; i < 6; i++) {
            tag += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return tag;
    };

    const handleCreateBaggage = async (newBaggage: {
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

            const tag = generateTag();

            const baggageData = {
                userId: newBaggage.userId,
                tag: tag,
                color: newBaggage.color,
                weight: newBaggage.weight,
                statusId: newBaggage.statusId,
                lastLocation: newBaggage.lastLocation,
                flightId: newBaggage.flightId,
                trackers: [],
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
            toast({
                variant: "destructive",
                title: "Erro ao criar bagagem!",
            });
        }
    };

    const handleDeleteBaggage = async (baggageId: number) => {
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
            toast({
                variant: "destructive",
                title: "Erro ao excluir bagagem!",
            });
        }
    };

    const handleSearchByTag = async (searchTerm: string) => {
        try {
            const response = await getBaggageByTag(searchTerm);
            const baggage: Baggages = response;

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
            if (baggages?.data?.length > 0) {
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
            await updateBaggage(updatedBaggage.id.toString(), updatedBaggage);
            const updatedBaggages = baggages.map(baggage => baggage.id === updatedBaggage.id ? updatedBaggage : baggage);
            setBaggages(updatedBaggages);
            setIsBaggageDetailsOpen(false);
            toast({
                variant: "success",
                title: "Bagagem atualizada com sucesso!",
            });

        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erro ao atualizar bagagem!",
            });
        }
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
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
                        <BaggageCreateDetails onSave={handleCreateBaggage} showFlightId={true} />
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
                <Dialog open={isEditBaggageOpen} onOpenChange={setIsEditBaggageOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Editar Bagagem</DialogTitle>
                        </DialogHeader>
                        {foundBaggage && (
                            <BaggageDetails
                                onSave={handleUpdateBaggage}
                                onDelete={handleDeleteBaggage}
                                baggage={foundBaggage}
                            />
                        )}
                    </DialogContent>
                </Dialog>
            </div>
            <BaggageTable
                baggages={baggages}
                onDelete={handleDeleteBaggage}
                onEdit={(baggage) => handleEditBaggage(baggage)}
            />
            <div className="mt-6 flex justify-center">
                <PaginationComponent currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    );
}
