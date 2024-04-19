import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { getUser, updateUser } from '@/services/user-service/userService';
import { useToast } from '@/components/ui/use-toast';
import { User } from '@/interfaces/user-interfaces/user';
import { Address } from '@/interfaces/user-interfaces/address';
import { LoaderCircle } from 'lucide-react';

export function UserProfile() {
    const [user, setUser] = useState<User | null>(null);
    const [currentPassword, setCurrentPassword] = useState<string>('');
    const [newPassword, setNewPassword] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const { toast } = useToast();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await getUser();
                setUser(response.user);
            } catch (error) {
                setError('Erro ao buscar os dados do usuário.');
            } finally {
                setLoading(false);
            }
        };

        fetchUser();
    }, []);

    const handleChange = (field: keyof User, value: string) => {
        setUser((prevUser) => ({
            ...(prevUser as User),
            [field]: value,
        }));
    };

    const handleAddressChange = (field: keyof Address, value: string) => {
        setUser((prevUser) => ({
            ...(prevUser as User),
            address: {
                ...(prevUser?.address || {}),
                [field]: value,
            } as Address,
        }));
    };

    const handleSave = async () => {
        if (newPassword && currentPassword) {
            if (newPassword === currentPassword) {
                toast({
                    title: 'Erro',
                    description: 'A nova senha deve ser diferente da senha atual.',
                    variant: 'destructive',
                });
                return;
            }

            if (newPassword.length < 8) {
                toast({
                    title: 'Erro',
                    description: 'A nova senha deve ter pelo menos 8 caracteres.',
                    variant: 'destructive',
                });
                return;
            }
        }

        try {
            const updateData = {
                name: user?.name,
                email: user?.email,
                password: newPassword || undefined,
                currentPassword: currentPassword || undefined,
                phone: user?.phone,
                address: user?.address,
                role: user?.role
            };

            const updatedUser = await updateUser(updateData);
            setUser(updatedUser);
            toast({
                title: 'Sucesso',
                description: 'Perfil atualizado com sucesso.',
                variant: 'success',
            });
            setCurrentPassword('');
            setNewPassword('');
        } catch (error) {
            toast({
                title: 'Erro',
                description: 'Ocorreu um erro ao atualizar o perfil.',
                variant: 'destructive',
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
        <div className="mx-auto p-8">
            <h1 className="text-3xl font-bold mb-8">Meu Perfil</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div>
                    <Label htmlFor="name">Nome:</Label>
                    <Input id="name" value={user?.name || ''} onChange={(e) => handleChange('name', e.target.value)} />
                </div>
                <div>
                    <Label htmlFor="phone">Telefone:</Label>
                    <Input id="phone" value={user?.phone || ''} onChange={(e) => handleChange('phone', e.target.value)} />
                </div>
                <div>
                    <Label htmlFor="cpf">CPF:</Label>
                    <Input id="cpf" value={user?.cpf || ''} onChange={(e) => handleChange('cpf', e.target.value)} disabled />
                </div>
                <div>
                    <Label htmlFor="email">Email:</Label>
                    <Input id="email" type="email" value={user?.email || ''} onChange={(e) => handleChange('email', e.target.value)} />
                </div>
                <div>
                    <Label htmlFor="role">Função:</Label>
                    <Select value={user?.role || ''} onValueChange={(value) => handleChange('role', value)} disabled >
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
                <div className="sm:col-span-3">
                    <h2 className="text-xl font-semibold mb-4">Endereço</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label>Rua:</Label>
                            <Input placeholder="Rua" value={user?.address?.street || ''} onChange={(e) => handleAddressChange('street', e.target.value)} />
                        </div>
                        <div>
                            <Label>Bairro:</Label>
                            <Input placeholder="Bairro" value={user?.address?.neighborhood || ''} onChange={(e) => handleAddressChange('neighborhood', e.target.value)} />
                        </div>
                        <div>
                            <Label>CEP:</Label>
                            <Input placeholder="CEP" value={user?.address?.zipcode || ''} onChange={(e) => handleAddressChange('zipcode', e.target.value)} />
                        </div>
                        <div>
                            <Label>Número:</Label>
                            <Input placeholder="Número" value={user?.address?.number || ''} onChange={(e) => handleAddressChange('number', e.target.value)} />
                        </div>
                        <div>
                            <Label>Complemento:</Label>
                            <Input placeholder="Complemento" value={user?.address?.complement || ''} onChange={(e) => handleAddressChange('complement', e.target.value)} />
                        </div>
                        <div>
                            <Label>Cidade:</Label>
                            <Input placeholder="Cidade" value={user?.address?.city || ''} onChange={(e) => handleAddressChange('city', e.target.value)} />
                        </div>
                        <div>
                            <Label>Estado:</Label>
                            <Input placeholder="Estado" value={user?.address?.state || ''} onChange={(e) => handleAddressChange('state', e.target.value)} />
                        </div>
                    </div>
                </div>
                <div className="sm:col-span-2">
                    <h2 className="text-xl font-semibold mb-4">Alterar Senha</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <Label htmlFor="currentPassword">Senha Atual:</Label>
                            <Input
                                id="currentPassword"
                                type="password"
                                value={currentPassword}
                                onChange={(e) => setCurrentPassword(e.target.value)}
                            />
                        </div>
                        <div>
                            <Label htmlFor="newPassword">Nova Senha:</Label>
                            <Input
                                id="newPassword"
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='mt-2'>
                        <Button onClick={handleSave}>Salvar</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};
