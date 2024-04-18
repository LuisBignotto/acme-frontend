import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { UserRegister } from '@/interfaces/user-interfaces/user-register';
import { UserCreateDetailsProps } from '@/interfaces/user-interfaces/user-create-props';

const UserCreateDetails: React.FC<UserCreateDetailsProps> = ({ onSave }) => {
    const [newUser, setNewUser] = useState<UserRegister>({
        id: '',
        name: '',
        email: '',
        cpf: '',
        password: '',
        role: '',
    });

    const handleChange = (field: keyof UserRegister, value: string) => {
        setNewUser({ ...newUser, [field]: value });
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
            <div className="sm:col-span-2 flex justify-end">
                <Button onClick={handleSave}>Salvar</Button>
            </div>
        </div>
    );
};

export default UserCreateDetails;
