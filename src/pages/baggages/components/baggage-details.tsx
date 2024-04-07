import { Baggages } from '@/interfaces/baggage-interfaces/Baggages';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface BaggageDetailsProps {
    baggage: Baggages;
    onSave: (updatedBaggage: Baggages) => void;
    onDelete: (id: string) => void;
}

const BaggageDetails: React.FC<BaggageDetailsProps> = ({ baggage, onSave, onDelete }) => {
    const [updatedBaggage, setUpdatedBaggage] = useState<Baggages>(baggage);

    const handleChange = (field: keyof Baggages, value: string | number) => {
        setUpdatedBaggage({ ...updatedBaggage, [field]: value });
    };

    const handleSave = () => {
        onSave(updatedBaggage);
    };

    const handleDelete = () => {
        onDelete(baggage.id);
    }

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
                <Select value={updatedBaggage.status} onValueChange={(value) => handleChange('status', value)}>
                    <SelectTrigger>
                        <SelectValue placeholder="Selecione o status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="DESPACHADA">DESPACHADA</SelectItem>
                        <SelectItem value="EM_ANALISE_DE_SEGURANCA">EM_ANALISE_DE_SEGURANCA</SelectItem>
                        <SelectItem value="REPROVADA_PELA_ANALISE_DE_SEGURANCA">REPROVADA_PELA_ANALISE_DE_SEGURANCA</SelectItem>
                        <SelectItem value="APROVADA_PELA_ANALISE_DE_SEGURANCA">APROVADA_PELA_ANALISE_DE_SEGURANCA</SelectItem>
                        <SelectItem value="NA_AERONAVE">NA_AERONAVE</SelectItem>
                        <SelectItem value="EM_VOO">EM_VOO</SelectItem>
                        <SelectItem value="DESTINO_INCERTO">DESTINO_INCERTO</SelectItem>
                        <SelectItem value="EXTRAVIADA">EXTRAVIADA</SelectItem>
                        <SelectItem value="AGUARDANDO_RECOLETA">AGUARDANDO_RECOLETA</SelectItem>
                        <SelectItem value="COLETADA">COLETADA</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div className="col-span-2">
                <Label htmlFor="lastSeenLocation">Última Localização:</Label>
                <Input id="lastSeenLocation" value={updatedBaggage.lastSeenLocation} onChange={(e) => handleChange('lastSeenLocation', e.target.value)} />
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
