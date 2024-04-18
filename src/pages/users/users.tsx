import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getActiveUsers, deleteUser, updateUser, registerUser } from "../../services/user-service/userService";
import UserTable from "./components/user-table";
import UserDetails from "./components/user-details";
import UserCreateDetails from "./components/user-create-details";
import PaginationComponent from "@/components/pagination/pagination-comp";
import { UserRegister } from "@/interfaces/user-interfaces/user-register";
import { User } from "@/interfaces/user-interfaces/user";
import { UsersResponse } from "@/interfaces/user-interfaces/user-response";

export function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [totalPages, setTotalPages] = useState<number>(0);
    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isUserDetailsOpen, setIsUserDetailsOpen] = useState<boolean>(false);
    const { toast } = useToast();

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const data: UsersResponse = await getActiveUsers(currentPage, 10, "name");
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
        const user = {...newUser, active: true}
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


    const handleDeleteUser = async (userId: string) => {
        try {
            await deleteUser();
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
            await updateUser(updatedUser);
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
