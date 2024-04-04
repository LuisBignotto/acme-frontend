import React, { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import FormField from '@/components/form-field/form-field';

interface SearchFlightFormProps {
    onSearch: (searchTerm: string) => void;
}

export const SearchFlightForm: React.FC<SearchFlightFormProps> = ({ onSearch }) => {
    const [searchTerm, setSearchTerm] = useState<string>('');

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSearch(searchTerm);
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className='mb-4'>
                <FormField
                    field="searchTerm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e)}
                    type="text"
                    placeholder="Digite a tag do voo"
                    placeholderHour=''
                    placeholderMinute=''
                />
            </div>
            <Button type="submit">Buscar</Button>
        </form>
    );
};
