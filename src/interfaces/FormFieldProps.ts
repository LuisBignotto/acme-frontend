import { CreateFlightFormState } from "./CreateFlightFormState";

export interface FormFieldProps {
    field: keyof CreateFlightFormState;
    value: string;
    onChange: (field: keyof CreateFlightFormState, value: string) => void;
    type: 'text' | 'date' | 'time';
    placeholder: string;
    placeholderHour?: string;
    placeholderMinute?: string;
}