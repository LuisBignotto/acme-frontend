import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BaggageFormState } from '@/interfaces/baggage-interfaces/BaggageFormState';
import { getUserByEmail } from '@/services/user-service/userService';
import { useToast } from '@/components/ui/use-toast';
import { User } from '@/interfaces/user-interfaces/user';

interface BaggageDetailsProps {
    onSave: (newBaggage: {
        userId: number;
        tag: string;
        color: string;
        weight: number;
        statusId: number;
        lastLocation: string;
        flightId: number;
        trackers: User[];
    }) => void;
    showFlightId?: boolean;
}

const BaggageCreateDetails: React.FC<BaggageDetailsProps> = ({ onSave, showFlightId = true }) => {
    const { flightId } = useParams<{ flightId: string }>();
    const { toast } = useToast();
    const [newBaggage, setNewBaggage] = useState<BaggageFormState>({
        userEmail: '',
        tag: '',
        color: '',
        weight: '',
        status: '',
        lastSeenLocation: '',
        flightId: flightId || '',
        isValid: false,
    });

    const handleChange = (field: keyof BaggageFormState, value: string) => {
        setNewBaggage({ ...newBaggage, [field]: value });
    };

    const generateTag = (): string => {
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let tag = '';
        for (let i = 0; i < 6; i++) {
            tag += characters.charAt(Math.floor(Math.random() * characters.length));
        }
        return tag;
    };

    const handleSave = async () => {
        try {
            if (!newBaggage.color || !newBaggage.weight || !newBaggage.status || !newBaggage.lastSeenLocation) {
                toast({
                    variant: "destructive",
                    title: "Erro: Todos os campos são obrigatórios.",
                    description: "Por favor, preencha todos os campos.",
                });
                return;
            }
    
            const user = await getUserByEmail(newBaggage.userEmail);
            const baggageData = {
                userId: user.id,
                tag: generateTag(),
                color: newBaggage.color,
                weight: parseFloat(newBaggage.weight),
                statusId: parseInt(newBaggage.status, 10),
                lastLocation: newBaggage.lastSeenLocation,
                flightId: showFlightId ? parseInt(newBaggage.flightId, 10) : parseInt(flightId!, 10),
                trackers: [],
            };
    
            onSave(baggageData);
        } catch (error) {
            toast({
                variant: "destructive",
                title: "Erro ao buscar usuário!",
                description: "Ocorreu um erro ao buscar o usuário pelo email.",
            });
        }
    };

    return (
        <div className="grid gap-4">
            <div className="col-span-2">
                <Label htmlFor="userEmail">Email do Usuário:</Label>
                <Input id="userEmail" value={newBaggage.userEmail} onChange={(e) => handleChange('userEmail', e.target.value)} />
            </div>
            <div>
                <Label htmlFor="color">Cor:</Label>
                <Input id="color" value={newBaggage.color} onChange={(e) => handleChange('color', e.target.value)} />
            </div>
            <div>
                <Label htmlFor="weight">Peso:</Label>
                <Input id="weight" type="text" value={newBaggage.weight} onChange={(e) => handleChange('weight', e.target.value)} />
            </div>
            <div className="col-span-2">
                <Label htmlFor="status">Status:</Label>
                <Select value={newBaggage.status} onValueChange={(value) => handleChange('status', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="1">DESPACHADA</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="col-span-2">
                <Label htmlFor="lastSeenLocation">Última Localização:</Label>
                <Input id="lastSeenLocation" value={newBaggage.lastSeenLocation} onChange={(e) => handleChange('lastSeenLocation', e.target.value)} />
            </div>
            {showFlightId && (
                <div className="col-span-2">
                    <Label htmlFor="flightId">ID do Voo:</Label>
                    <Input id="flightId" value={newBaggage.flightId} onChange={(e) => handleChange('flightId', e.target.value)} />
                </div>
            )}
            <div className="flex space-x-1">
                <Button onClick={handleSave}>Criar</Button>
            </div>
        </div>
    );
};

export default BaggageCreateDetails;
