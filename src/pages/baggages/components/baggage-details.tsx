import { Baggages } from '@/interfaces/baggage-interfaces/Baggages';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Status } from '@/interfaces/baggage-interfaces/Status';

interface BaggageDetailsProps {
    baggage: Baggages;
    onSave: (updatedBaggage: Baggages) => void;
    onDelete: (id: number) => void;
}

const statusOptions: Status[] = [
    { id: 1, status: 'DESPACHADA' },
    { id: 2, status: 'EM_ANALISE_DE_SEGURANCA' },
    { id: 3, status: 'REPROVADA_PELA_ANALISE_DE_SEGURANCA' },
    { id: 4, status: 'APROVADA_PELA_ANALISE_DE_SEGURANCA' },
    { id: 5, status: 'NA_AERONAVE' },
    { id: 6, status: 'EM_VOO' },
    { id: 7, status: 'DESTINO_INCERTO' },
    { id: 8, status: 'EXTRAVIADA' },
    { id: 9, status: 'AGUARDANDO_RECOLETA' },
    { id: 10, status: 'COLETADA' },
];

const BaggageDetails: React.FC<BaggageDetailsProps> = ({ baggage, onSave, onDelete }) => {
    const [updatedBaggage, setUpdatedBaggage] = useState<Baggages>(baggage);

    const handleChange = (field: keyof Baggages, value: any) => {
        setUpdatedBaggage({ ...updatedBaggage, [field]: value });
    };

    const handleStatusChange = (statusId: number, statusLabel: string) => {
        setUpdatedBaggage({ ...updatedBaggage, status: { id: statusId, status: statusLabel } });
    };

    const handleSave = () => {
        onSave(updatedBaggage);
    };

    const handleDelete = () => {
        onDelete(baggage.id);
    };

    return (
        <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
                <Label htmlFor="id">ID:</Label>
                <Input id="id" value={updatedBaggage.id} disabled />
            </div>
            <div className="col-span-2">
                <Label htmlFor="userId">ID do Usuário:</Label>
                <Input id="userId" value={updatedBaggage.userId} disabled />
            </div>
            <div>
                <Label htmlFor="tag">Tag:</Label>
                <Input id="tag" value={updatedBaggage.tag} disabled />
            </div>
            <div>
                <Label htmlFor="color">Cor:</Label>
                <Input id="color" value={updatedBaggage.color} disabled />
            </div>
            <div>
                <Label htmlFor="weight">Peso:</Label>
                <Input id="weight" type="number" value={updatedBaggage.weight} disabled />
            </div>
            <div>
                <Label htmlFor="status">Status:</Label>
                <Select 
                    value={updatedBaggage.status.id.toString()} 
                    onValueChange={(value) => {
                        const statusId = parseInt(value);
                        const statusLabel = statusOptions.find(option => option.id === statusId)?.status || '';
                        handleStatusChange(statusId, statusLabel);
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                        {statusOptions.map((option) => (
                            <SelectItem key={option.id} value={option.id.toString()}>
                                {option.status}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className="col-span-2">
                <Label htmlFor="lastSeenLocation">Última Localização:</Label>
                <Input id="lastSeenLocation" value={updatedBaggage.lastLocation} onChange={(e) => handleChange('lastLocation', e.target.value)} />
            </div>
            <div className="col-span-2">
                <Label htmlFor="flightId">ID do Voo:</Label>
                <Input id="flightId" value={updatedBaggage.flightId} onChange={(e) => handleChange('flightId', e.target.value)} />
            </div>
            <div className="flex space-x-1">
                <Button onClick={handleSave}>Salvar</Button>
                <Button variant={'destructive'} onClick={handleDelete}>Apagar</Button>
            </div>
        </div>
    );
};

export default BaggageDetails;