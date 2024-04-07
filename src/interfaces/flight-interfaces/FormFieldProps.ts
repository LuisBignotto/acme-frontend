export interface FormFieldProps {
    field: string;
    value: string;
    onChange: (value: string) => void;
    type: 'text' | 'date' | 'minute' | 'hour';
    placeholder: string;
    placeholderHour?: string;
    placeholderMinute?: string;
}