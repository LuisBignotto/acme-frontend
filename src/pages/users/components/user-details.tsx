import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserDetailsProps } from '@/interfaces/user-interfaces/user-details-props';
import { User } from '@/interfaces/user-interfaces/user';
import { Address } from '@/interfaces/user-interfaces/address';


const UserDetails: React.FC<UserDetailsProps> = ({ user, onSave, onDelete }) => {
    const [updatedUser, setUpdatedUser] = useState<User>(user);

    const handleChange = (field: keyof User, value: string) => {
        setUpdatedUser({ ...updatedUser, [field]: value });
    };

    const handleAddressChange = (field: keyof Address, value: string) => {
        setUpdatedUser({
            ...updatedUser,
            address: {
                ...updatedUser.address,
                [field]: value,
            } as Address,
        });
    };

    const handleSave = () => {
        onSave(updatedUser);
    };

    const handleDelete = () => {
        onDelete(user.id);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
                <Label htmlFor="name">Nome:</Label>
                <Input id="name" value={updatedUser.name} onChange={(e) => handleChange('name', e.target.value)} />
            </div>
            <div>
                <Label htmlFor="phone">Telefone:</Label>
                <Input id="phone" value={updatedUser.phone || ''} onChange={(e) => handleChange('phone', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
                <Label htmlFor="email">Email:</Label>
                <Input id="email" type="email" value={updatedUser.email} onChange={(e) => handleChange('email', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
                <Label htmlFor="role">Função:</Label>
                <Select value={updatedUser.role} onValueChange={(value) => handleChange('role', value)}>
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
                        <Input placeholder="Rua" value={updatedUser.address?.street || ''} onChange={(e) => handleAddressChange('street', e.target.value)} />
                    </div>
                    <div>
                        <Label>Bairro:</Label>
                        <Input placeholder="Bairro" value={updatedUser.address?.neighborhood || ''} onChange={(e) => handleAddressChange('neighborhood', e.target.value)} />
                    </div>
                    <div>
                        <Label>CEP:</Label>
                        <Input placeholder="CEP" value={updatedUser.address?.zipcode || ''} onChange={(e) => handleAddressChange('zipcode', e.target.value)} />
                    </div>
                    <div>
                        <Label>Número:</Label>
                        <Input placeholder="Número" value={updatedUser.address?.number || ''} onChange={(e) => handleAddressChange('number', e.target.value)} />
                    </div>
                    <div>
                        <Label>Complemento:</Label>
                        <Input placeholder="Complemento" value={updatedUser.address?.complement || ''} onChange={(e) => handleAddressChange('complement', e.target.value)} />
                    </div>
                    <div>
                        <Label>Cidade:</Label>
                        <Input placeholder="Cidade" value={updatedUser.address?.city || ''} onChange={(e) => handleAddressChange('city', e.target.value)} />
                    </div>
                    <div>
                        <Label>Estado:</Label>
                        <Input placeholder="Estado" value={updatedUser.address?.state || ''} onChange={(e) => handleAddressChange('state', e.target.value)} />
                    </div>
                </div>
            </div>
            <div className="sm:col-span-2 flex justify-end space-x-2">
                <Button onClick={handleSave}>Salvar</Button>
                <Button variant="destructive" onClick={handleDelete}>Excluir</Button>
            </div>
        </div>
    );
};

export default UserDetails;
