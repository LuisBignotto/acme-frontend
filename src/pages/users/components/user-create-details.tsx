import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { UserRegister } from '@/interfaces/user-interfaces/user-register';
import { UserCreateDetailsProps } from '@/interfaces/user-interfaces/user-create-props';

const roles = [
    { value: "ROLE_ADMIN", label: "Administrador" },
    { value: "ROLE_USER", label: "Usuário" },
    { value: "ROLE_BAGGAGE_MANAGER", label: "Gerente de Bagagem" },
    { value: "ROLE_SUPPORT", label: "Suporte" }
];

const UserCreateDetails: React.FC<UserCreateDetailsProps> = ({ onSave }) => {
    const [newUser, setNewUser] = useState<UserRegister>({
        id: 0,
        name: '',
        email: '',
        cpf: '',
        password: '',
        roles: [],
    });

    const handleChange = (field: keyof UserRegister, value: string) => {
        setNewUser({ ...newUser, [field]: value });
    };

    const handleRoleChange = (role: string) => {
        setNewUser((prevUser) => {
            const roles = prevUser.roles.includes(role)
                ? prevUser.roles.filter(r => r !== role)
                : [...prevUser.roles, role]; 

            return { ...prevUser, roles }; 
        });
    };

    const handleSave = () => {
        onSave(newUser);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
                <Label htmlFor="name">Nome:</Label>
                <Input id="name" value={newUser.name} onChange={(e) => handleChange('name', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
                <Label htmlFor="email">Email:</Label>
                <Input id="email" type="email" value={newUser.email} onChange={(e) => handleChange('email', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
                <Label htmlFor="cpf">CPF:</Label>
                <Input id="cpf" value={newUser.cpf} onChange={(e) => handleChange('cpf', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
                <Label htmlFor="password">Senha:</Label>
                <Input id="password" type="password" value={newUser.password} onChange={(e) => handleChange('password', e.target.value)} />
            </div>
            <div className="sm:col-span-2">
                <Label>Funções:</Label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {roles.map((role) => (
                        <div key={role.value}>
                            <label className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={newUser.roles.includes(role.value)}
                                    onChange={() => handleRoleChange(role.value)}
                                />
                                <span>{role.label}</span>
                            </label>
                        </div>
                    ))}
                </div>
            </div>
            <div className="sm:col-span-2 flex justify-end">
                <Button onClick={handleSave}>Salvar</Button>
            </div>
        </div>
    );
};

export default UserCreateDetails;
