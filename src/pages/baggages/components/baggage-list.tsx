import React from 'react';
import { Baggages } from '@/interfaces/baggage-interfaces/Baggages';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';

interface BaggageSearchResultsProps {
    baggages: Baggages[];
    onEdit: (baggage: Baggages) => void;
    onDelete: (id: string) => void;
}

const BaggageSearchResults: React.FC<BaggageSearchResultsProps> = ({ baggages, onEdit, onDelete }) => {
    if (baggages.length === 0) {
        return <p>Nenhum resultado encontrado.</p>;
    }

    return (
        <div>
            <h3 className="text-lg font-semibold mb-4">Resultados da Pesquisa:</h3>
            <ul className="space-y-6">
                {baggages.map((baggage) => (
                    <li key={baggage.id} className="flex items-center justify-between border-b border-gray-200 pb-4">
                        <div>
                            <span className="text-base font-bold">Tag: </span>
                            <span className="text-base">{baggage.tag}</span>
                        </div>
                        <div className="flex space-x-2">
                            <Button
                                size="sm"
                                onClick={() => onEdit(baggage)}
                            >
                                <Pencil size={22} />
                            </Button>
                            <Button
                                variant="destructive"
                                size="sm"
                                onClick={() => onDelete(baggage.id)}
                            >
                                <Trash2 />
                            </Button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BaggageSearchResults;
