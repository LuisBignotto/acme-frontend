import React from 'react';
import { Input } from "@/components/ui/input";
import { DatePickerDemo } from "@/components/ui/date-picker";
import SelectMinute from "./select-minute";
import { format } from "date-fns";
import SelectHour from './select-hour';
import { FormFieldProps } from '@/interfaces/flight-interfaces/FormFieldProps';

const FormField: React.FC<FormFieldProps> = ({ field, value, onChange, type, placeholder, placeholderHour, placeholderMinute }) => {
    switch (type) {
        case 'date':
            return (
                <DatePickerDemo
                    selected={value ? new Date(value) : undefined}
                    onSelect={(date) => onChange(format(date, "yyyy-MM-dd"))}
                />
            );
        case 'minute':
            return (
                <div className="flex space-x-2">
                    <SelectMinute
                        value={value}
                        onChange={onChange}
                        placeholder={placeholderMinute}
                    />
                </div>
            );
        case 'hour':
            return (
                <div className="flex space-x-2">
                    <SelectHour
                        value={value}
                        onChange={onChange}
                        placeholder={placeholderHour}
                    />
                </div>
            );
        default:
            return (
                <Input
                    id={field}
                    type="text"
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    placeholder={placeholder}
                />
            );
    }
};

export default FormField;
