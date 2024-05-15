import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { deleteUser, updateUser, registerUser, getUserByEmail, getAllUsers } from "../../services/user-service/userService";
import UserTable from "./components/user-table";
import UserDetails from "./components/user-details";
import UserCreateDetails from "./components/user-create-details";
import PaginationComponent from "@/components/pagination/pagination-comp";
import { UserRegister } from "@/interfaces/user-interfaces/user-register";
import { User } from "@/interfaces/user-interfaces/user";
import { UsersResponse } from "@/interfaces/user-interfaces/user-response";
import { SearchUserByEmail } from "./components/search-by-email";

export function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isUserDetailsOpen, setIsUserDetailsOpen] = useState<boolean>(false);
    const [isSearchByEmailOpen, setIsSearchByEmailOpen] = useState<boolean>(false);
    const { toast } = useToast();

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data: UsersResponse = await getAllUsers(currentPage, 10, "id");
            setUsers(data.content);
            setTotalPages(data.totalPages);
            setCurrentPage(data.number);
        } catch (error) {
            console.error("Erro ao buscar usuários:", error);
            toast({
                variant: "destructive",
                title: "Falha ao buscar usuários!",
                description: "Ocorreu um erro ao buscar os usuários.",
            });
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, [currentPage]);

    const handleCreateUser = async (newUser: UserRegister) => {
        const user = { ...newUser, active: true }
        try {
            await registerUser(user);
            toast({
                variant: "success",
                title: "Usuário criado com sucesso!",
            });
            fetchUsers();
            setIsCreateOpen(false);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erro ao criar usuário!",
                description: "Não foi possível criar o usuário.",
            });
        }
    };

    const handleDeleteUser = async (userId: number) => {
        try {
            await deleteUser(userId);
            const updatedUsers = users.filter((user) => user.id !== userId);
            setUsers(updatedUsers);
            toast({
                variant: "success",
                title: "Usuário excluído com sucesso!",
            });
        } catch (error) {
            console.error("Erro ao excluir usuário:", error);
            toast({
                variant: "destructive",
                title: "Erro ao excluir usuário!",
            });
        }
    };

    const handleEditUser = (user: User) => {
        setSelectedUser(user);
        setIsUserDetailsOpen(true);
    };

    const handleUpdateUser = async (updatedUser: User) => {
        try {
            await updateUser(updatedUser.id, updatedUser);
            const updatedUsers = users.map((user) =>
                user.id === updatedUser.id ? updatedUser : user
            );
            setUsers(updatedUsers);
            setIsUserDetailsOpen(false);
            toast({
                variant: "success",
                title: "Usuário atualizado com sucesso!",
            });
        } catch (error) {
            console.error("Erro ao atualizar usuário:", error);
            toast({
                variant: "destructive",
                title: "Erro ao atualizar usuário!",
            });
        }
    };

    const handleSearchByEmail = async (email: string) => {
        try {
            const user = await getUserByEmail(email);
            if (user) {
                setSelectedUser(user);
                setIsSearchByEmailOpen(false);
                setIsUserDetailsOpen(true);
                toast({
                    variant: "success",
                    title: "Usuário encontrado com sucesso!",
                });
            } else {
                toast({
                    variant: "destructive",
                    title: "Usuário não encontrado",
                    description: "Nenhum usuário encontrado com o email fornecido.",
                });
            }
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erro ao buscar usuário",
                description: "Tente novamente mais tarde.",
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
                <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
                    <DialogTrigger asChild>
                        <Button>Criar Usuário</Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Criar Usuário</DialogTitle>
                        </DialogHeader>
                        <UserCreateDetails onSave={handleCreateUser} />
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
                        <SearchUserByEmail onSearch={handleSearchByEmail} />
                    </DialogContent>
                </Dialog>
                <Dialog open={isUserDetailsOpen} onOpenChange={setIsUserDetailsOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Detalhes do Usuário</DialogTitle>
                        </DialogHeader>
                        {selectedUser && (
                            <UserDetails
                                user={selectedUser}
                                onSave={handleUpdateUser}
                                onDelete={handleDeleteUser}
                            />
                        )}
                    </DialogContent>
                </Dialog>
            </div>
            <UserTable
                users={users}
                onDelete={handleDeleteUser}
                onEdit={handleEditUser}
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
