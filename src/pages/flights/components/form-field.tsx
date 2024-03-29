import React from 'react';
import { Input } from "@/components/ui/input";
import { DatePickerDemo } from "@/components/ui/date-picker";
import SelectTime from "./select-time";
import { format } from "date-fns";

interface FormFieldProps {
    field: string;
    value: string;
    onChange: (value: string) => void;
    type: 'text' | 'date' | 'time';
    placeholder: string;
    placeholderHour: string;
    placeholderMinute: string;
}

const FormField: React.FC<FormFieldProps> = ({ field, value, onChange, type, placeholder, placeholderHour, placeholderMinute }) => {
    switch (type) {
        case 'date':
            return (
                <DatePickerDemo
                    selected={value ? new Date(value) : undefined}
                    onSelect={(date) => onChange(format(date, "yyyy-MM-dd"))}
                />
            );
        case 'time':
            return (
                <div className="flex space-x-2">
                    <SelectTime
                        value={value}
                        onChange={onChange}
                        placeholder={placeholderHour}
                        time="horas"
                    />
                    <SelectTime
                        value={value}
                        onChange={onChange}
                        placeholder={placeholderMinute}
                        time="minutos"
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
