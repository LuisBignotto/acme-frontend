import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    phone: string | null;
    role: string;
    address: Address | null;
}


interface Address {
    street: string;
    neighborhood: string;
    zipcode: string;
    number: string;
    complement: string;
    city: string;
    state: string;
}

interface UserTableProps {
    users: User[];
    onEdit: (user: User) => void;
    onDelete: (userId: string) => void;
}

const getRoleLabel = (role: string) => {
    switch (role) {
        case "ADMINISTRATOR":
            return "Administrador";
        case "REGULAR_USER":
            return "Usuário Regular";
        case "BAGGAGE_MANAGER":
            return "Gerente de Bagagem";
        case "SUPPORT":
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
                    <TableHead>Nome</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Telefone</TableHead>
                    <TableHead>Função</TableHead>
                    <TableHead>Endereço</TableHead>
                    <TableHead>Ações</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {users.map((user) => (
                    <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>{user.phone || "-"}</TableCell>
                        <TableCell>{getRoleLabel(user.role)}</TableCell>
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
                                <Button
                                    variant="destructive"
                                    size="sm"
                                    onClick={() => onDelete(user.id)}
                                >
                                    <Trash2 />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default UserTable;
