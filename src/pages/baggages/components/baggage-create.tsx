import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { BaggageFormState } from '@/interfaces/baggage-interfaces/BaggageFormState';

interface BaggageDetailsProps {
    onSave: (newBaggage: BaggageFormState) => void;
}

const BaggageCreateDetails: React.FC<BaggageDetailsProps> = ({ onSave }) => {
    const [newBaggage, setNewBaggage] = useState<BaggageFormState>({
        userEmail: '',
        tag: '',
        color: '',
        weight: '',
        status: '',
        lastSeenLocation: '',
        flightId: '',
        isValid: false,
    });

    const handleChange = (field: keyof BaggageFormState, value: string) => {
        setNewBaggage({ ...newBaggage, [field]: value });
    };

    const handleSave = () => {
        onSave(newBaggage);
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
                        <SelectItem value="DESPACHADA">DESPACHADA</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="col-span-2">
                <Label htmlFor="lastSeenLocation">Última Localização:</Label>
                <Input id="lastSeenLocation" value={newBaggage.lastSeenLocation} onChange={(e) => handleChange('lastSeenLocation', e.target.value)} />
            </div>
            <div className="col-span-2">
                <Label htmlFor="flightId">Tag do Voo:</Label>
                <Input id="flightId" value={newBaggage.flightId} onChange={(e) => handleChange('flightId', e.target.value)} />
            </div>
            <div className="flex space-x-1">
                <Button onClick={handleSave}>Criar</Button>
            </div>
        </div>
    );
};

export default BaggageCreateDetails;
