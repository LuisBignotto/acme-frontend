import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { getActiveUsers, getInactiveUsers, deleteUser, updateUser, registerUser } from "../../services/user-service/userService";
import UserTable from "./components/user-table";
import UserDetails from "./components/user-details";
import UserCreateDetails from "./components/user-create-details";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
}

export function UsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [isCreateOpen, setIsCreateOpen] = useState<boolean>(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [isUserDetailsOpen, setIsUserDetailsOpen] = useState<boolean>(false);
    const { toast } = useToast();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const activeUsers = await getActiveUsers(0, 10, "name");
                const inactiveUsers = await getInactiveUsers(0, 10, "name");
                const allUsers = [...activeUsers, ...inactiveUsers];
                setUsers(allUsers);
                setLoading(false);
            } catch (error) {
                console.error("Erro ao buscar usuários:", error);
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleCreateUser = async (newUser: User) => {
        try {
            const createdUser = await registerUser(newUser);
            setUsers([...users, createdUser]);
            setIsCreateOpen(false);
            toast({
                variant: "success",
                title: "Usuário criado com sucesso!",
            });
        } catch (error) {
            console.error("Erro ao criar usuário:", error);
            toast({
                variant: "destructive",
                title: "Erro ao criar usuário!",
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
        </div>
    );
}
