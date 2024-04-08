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

interface UserCreateDetailsProps {
    onSave: (newUser: User) => void;
}

const UserCreateDetails: React.FC<UserCreateDetailsProps> = ({ onSave }) => {
    const [newUser, setNewUser] = useState<User>({
        id: '',
        name: '',
        email: '',
        role: '',
        status: '',
    });

    const handleChange = (field: keyof User, value: string) => {
        setNewUser({ ...newUser, [field]: value });
    };

    const handleSave = () => {
        onSave(newUser);
    };

    return (
        <div className="grid gap-4">
            <div>
                <Label htmlFor="name">Nome:</Label>
                <Input id="name" value={newUser.name} onChange={(e) => handleChange('name', e.target.value)} />
            </div>
            <div>
                <Label htmlFor="email">Email:</Label>
                <Input id="email" type="email" value={newUser.email} onChange={(e) => handleChange('email', e.target.value)} />
            </div>
            <div>
                <Label htmlFor="role">Função:</Label>
                <Select value={newUser.role} onValueChange={(value) => handleChange('role', value)}>
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
                <Select value={newUser.status} onValueChange={(value) => handleChange('status', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="active">Ativo</SelectItem>
                        <SelectItem value="inactive">Inativo</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="flex justify-end">
                <Button onClick={handleSave}>Salvar</Button>
            </div>
        </div>
    );
};

export default UserCreateDetails;
