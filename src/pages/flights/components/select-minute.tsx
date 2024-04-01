import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { SelectProps } from '@/interfaces/flight-interfaces/SelectProps';

const SelectMinute: React.FC<SelectProps> = ({ value, onChange, placeholder }) => {
    const minutes = ['00', '15', '30', '45'];

    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {minutes.map((minute) => (
                    <SelectItem key={minute} value={minute}>
                        {minute}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    );
};

export default SelectMinute;
