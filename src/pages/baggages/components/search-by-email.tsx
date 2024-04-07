import React, { useState, FormEvent } from 'react';
import { Button } from "@/components/ui/button";
import FormField from '@/components/form-field/form-field';

interface SearchBaggageByEmail {
    onSearch: (searchTerm: string) => void;
}

export const SearchBaggageByEmail: React.FC<SearchBaggageByEmail> = ({ onSearch }) => {
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
                    placeholder="Digite o email"
                    placeholderHour=''
                    placeholderMinute=''
                />
            </div>
            <Button type="submit">Buscar</Button>
        </form>
    );
};
