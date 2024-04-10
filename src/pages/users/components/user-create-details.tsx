import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

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

interface UserCreateDetailsProps {
    onSave: (newUser: User) => void;
}

const UserCreateDetails: React.FC<UserCreateDetailsProps> = ({ onSave }) => {
    const [newUser, setNewUser] = useState<User>({
        id: '',
        name: '',
        email: '',
        password: '',
        phone: '',
        role: '',
        address: null,
    });

    const handleChange = (field: keyof User, value: string) => {
        setNewUser({ ...newUser, [field]: value });
    };

    const handleAddressChange = (field: keyof Address, value: string) => {
        setNewUser({
            ...newUser,
            address: {
                ...newUser.address,
                [field]: value,
            } as Address,
        });
    };

    const handleSave = () => {
        onSave(newUser);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <Label htmlFor="name">Nome:</Label>
                <Input id="name" value={newUser.name} onChange={(e) => handleChange('name', e.target.value)} />
            </div>
            <div>
                <Label htmlFor="phone">Telefone:</Label>
                <Input id="phone" value={newUser.phone || ''} onChange={(e) => handleChange('phone', e.target.value)} />
            </div>
            <div>
                <Label htmlFor="email">Email:</Label>
                <Input id="email" type="email" value={newUser.email} onChange={(e) => handleChange('email', e.target.value)} />
            </div>
            <div>
                <Label htmlFor="password">Senha:</Label>
                <Input id="password" type="password" value={newUser.password} onChange={(e) => handleChange('password', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
                <Label htmlFor="role">Função:</Label>
                <Select value={newUser.role} onValueChange={(value) => handleChange('role', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecione a função" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ADMINISTRATOR">Administrador</SelectItem>
                        <SelectItem value="REGULAR_USER">Usuário Regular</SelectItem>
                        <SelectItem value="BAGGAGE_MANAGER">Gerente de Bagagem</SelectItem>
                        <SelectItem value="SUPPORT">Suporte</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="sm:col-span-2">
                <Label>Endereço:</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <div>
                        <Label>Rua:</Label>
                        <Input placeholder="Rua" value={newUser.address?.street || ''} onChange={(e) => handleAddressChange('street', e.target.value)} />
                    </div>
                    <div>
                        <Label>Bairro:</Label>
                        <Input placeholder="Bairro" value={newUser.address?.neighborhood || ''} onChange={(e) => handleAddressChange('neighborhood', e.target.value)} />
                    </div>
                    <div>
                        <Label>CEP:</Label>
                        <Input placeholder="CEP" value={newUser.address?.zipcode || ''} onChange={(e) => handleAddressChange('zipcode', e.target.value)} />
                    </div>
                    <div>
                        <Label>Número:</Label>
                        <Input placeholder="Número" value={newUser.address?.number || ''} onChange={(e) => handleAddressChange('number', e.target.value)} />
                    </div>
                    <div>
                        <Label>Complemento:</Label>
                        <Input placeholder="Complemento" value={newUser.address?.complement || ''} onChange={(e) => handleAddressChange('complement', e.target.value)} />
                    </div>
                    <div>
                        <Label>Cidade:</Label>
                        <Input placeholder="Cidade" value={newUser.address?.city || ''} onChange={(e) => handleAddressChange('city', e.target.value)} />
                    </div>
                    <div>
                        <Label>Estado:</Label>
                        <Input placeholder="Estado" value={newUser.address?.state || ''} onChange={(e) => handleAddressChange('state', e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="sm:col-span-2 flex justify-end">
                <Button onClick={handleSave}>Salvar</Button>
            </div>
        </div>
    );
};

export default UserCreateDetails;
