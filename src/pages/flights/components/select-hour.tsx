import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SelectProps } from '@/interfaces/flight-interfaces/SelectProps';

const SelectHour: React.FC<SelectProps> = ({ value, onChange, placeholder }) => {
    const hours = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];

    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {hours.map((hour) => (
                    <SelectItem key={hour} value={hour}>
                        {hour}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SelectHour;
