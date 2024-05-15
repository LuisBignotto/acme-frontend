import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";
import { AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { UserTableProps } from "@/interfaces/user-interfaces/user-table-props";

const getRoleLabel = (role: string) => {
    switch (role) {
        case "ROLE_ADMIN":
            return "Administrador";
        case "ROLE_USER":
            return "Usuário Regular";
        case "ROLE_BAGGAGE_MANAGER":
            return "Gerente de Bagagem";
        case "ROLE_SUPPORT":
            return "Suporte";
        default:
            return role;
    }
};

const UserTable: React.FC<UserTableProps> = ({ users, onEdit, onDelete }) => {
    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead>ID</TableHead>
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>CPF</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Funções</TableHead>
                    <TableHead>Endereço</TableHead>
                    <TableHead>Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>{user.id}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.cpf}</TableCell>
                        <TableCell>{user.phone || "-"}</TableCell>
                        <TableCell>
                            {user.roles.map((role) => (
                                <div key={role}>{getRoleLabel(role)}</div>
                            ))}
                        </TableCell>
                        <TableCell>
                            {user.address ? (
                                <div>
                                    {user.address.street}, {user.address.number}<br />
                                    {user.address.neighborhood}, {user.address.city} - {user.address.state}<br />
                                    {user.address.zipcode}
                                </div>
                            ) : (
                                "-"
                            )}
                        </TableCell>
                        <TableCell>
                            <div className="flex space-x-2">
                                <Button
                                    size="sm"
                                    onClick={() => onEdit(user)}
                                >
                                    <Pencil size={22} />
                                </Button>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                        >
                                            <Trash2 />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                                        <AlertDialogDescription>Tem certeza de que deseja excluir este usuário?</AlertDialogDescription>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => onDelete(user.id)}>Confirmar</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default UserTable;
