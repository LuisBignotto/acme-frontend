import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
}

interface UserDetailsProps {
    user: User;
    onSave: (updatedUser: User) => void;
    onDelete: (userId: string) => void;
}

const UserDetails: React.FC<UserDetailsProps> = ({ user, onSave, onDelete }) => {
    const [updatedUser, setUpdatedUser] = useState<User>(user);

    const handleChange = (field: keyof User, value: string) => {
        setUpdatedUser({ ...updatedUser, [field]: value });
    };

    const handleSave = () => {
        onSave(updatedUser);
    };

    const handleDelete = () => {
        onDelete(user.id);
    };

    return (
        <div className="grid gap-4">
            <div>
                <Label htmlFor="name">Nome:</Label>
                <Input id="name" value={updatedUser.name} onChange={(e) => handleChange('name', e.target.value)} />
            </div>
            <div>
                <Label htmlFor="email">Email:</Label>
                <Input id="email" type="email" value={updatedUser.email} onChange={(e) => handleChange('email', e.target.value)} />
            </div>
            <div>
                <Label htmlFor="role">Função:</Label>
                <Select value={updatedUser.role} onValueChange={(value) => handleChange('role', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecione a função" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="admin">Admin</SelectItem>
                        <SelectItem value="user">User</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label htmlFor="status">Status:</Label>
                <Select value={updatedUser.status} onValueChange={(value) => handleChange('status', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="active">Ativo</SelectItem>
                        <SelectItem value="inactive">Inativo</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex justify-end space-x-2">
                <Button onClick={handleSave}>Salvar</Button>
                <Button variant="destructive" onClick={handleDelete}>Excluir</Button>
            </div>
        </div>
    );
};

export default UserDetails;
