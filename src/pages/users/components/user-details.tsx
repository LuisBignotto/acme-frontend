import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserDetailsProps } from '@/interfaces/user-interfaces/user-details-props';
import { User } from '@/interfaces/user-interfaces/user';
import { Address } from '@/interfaces/user-interfaces/address';
import { updateUserRole } from '../../../services/user-service/userService';

const roles = [
    { value: "ROLE_ADMIN", label: "Administrador" },
    { value: "ROLE_USER", label: "Usuário" },
    { value: "ROLE_BAGGAGE_MANAGER", label: "Gerente de Bagagem" },
    { value: "ROLE_SUPPORT", label: "Suporte" }
];

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

    const handleRoleChange = async (role: string) => {
        try {
            await updateUserRole(updatedUser.id, role);
            setUpdatedUser({ ...updatedUser, role });
        } catch (error) {
            console.error("Erro ao modificar cargo do usuário:", error);
        }
    };

    const handleSave = () => {
        onSave(updatedUser);
    };

    const handleDelete = () => {
        onDelete(updatedUser.id);
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
            <div>
                <Label htmlFor="email">Email:</Label>
                <Input id="email" type="email" value={updatedUser.email} onChange={(e) => handleChange('email', e.target.value)} />
            </div>
            <div>
                <Label htmlFor="cpf">CPF:</Label>
                <Input id="cpf" value={updatedUser.cpf || ''} onChange={(e) => handleChange('cpf', e.target.value)} disabled />
            </div>
            <div className="sm:col-span-2">
                <Label htmlFor="role">Função:</Label>
                <select
                    id="role"
                    value={updatedUser.role}
                    onChange={(e) => handleRoleChange(e.target.value)}
                    className="border p-2 rounded-md w-full"
                >
                    <option value="" disabled>Selecione uma função</option>
                    {roles.map((role) => (
                        <option key={role.value} value={role.value}>
                            {role.label}
                        </option>
                    ))}
                </select>
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
