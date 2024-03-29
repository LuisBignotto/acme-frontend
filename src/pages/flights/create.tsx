import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { CreateFlightFormState } from "@/interfaces/CreateFlightFormState";
import { createFlight } from "@/services/flights-service/flightsService";
import FormField from "./components/form-field";

const fieldLabels: { [K in keyof Omit<CreateFlightFormState, 'isValid'>]: string } = {
    departureAirport: "Aeroporto de Partida",
    departureDate: "Data de Partida",
    departureTime: "Horário de Partida",
    arrivalAirport: "Aeroporto de Chegada",
    arrivalDate: "Data de Chegada",
    arrivalTime: "Horário de Chegada",
};

export function CreateFlightForm() {
    const [state, setState] = useState<CreateFlightFormState>({
        departureAirport: "",
        departureDate: "",
        departureTime: "",
        arrivalAirport: "",
        arrivalDate: "",
        arrivalTime: "",
        isValid: true,
    });

    const handleChange = (field: keyof CreateFlightFormState, value: string) => {
        setState({ ...state, [field]: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (state.isValid) {
            console.log(state)
            createFlight(state)
                .then(() => {
                    alert("Voo criado com sucesso!");
                })
                .catch((e) => {
                    console.error("Erro ao criar o voo:", e);
                    setState({ ...state, isValid: false });
                });
        }
    };

    return (
        <div className="h-full flex items-center justify-center px-4">
            <Card className="w-full max-w-xl">
                <form onSubmit={handleSubmit}>
                    <CardHeader>
                        <CardTitle className="text-2xl">Criar Novo Voo</CardTitle>
                        <CardDescription>
                            Preencha as informações do voo.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="grid gap-4">
                            {(Object.keys(fieldLabels) as (keyof Omit<CreateFlightFormState, 'isValid'>)[]).map((field) => (
                                <div key={field} className="grid gap-2">
                                    <Label htmlFor={field}>{fieldLabels[field]}</Label>
                                    <FormField
                                        field={field}
                                        value={state[field]}
                                        onChange={(value) => handleChange(field, value)}
                                        type={field === 'departureDate' || field === 'arrivalDate' ? 'date' : field === 'departureTime' || field === 'arrivalTime' ? 'time' : 'text'}
                                        placeholder={fieldLabels[field]}
                                        placeholderHour={field.includes('departure') ? 'Selecione a hora de partida' : 'Selecione a hora de chegada'}
                                        placeholderMinute={field.includes('departure') ? 'Selecione o minuto de partida' : 'Selecione o minuto de chegada'}
                                    />
                                </div>
                            ))}
                            <Button type="submit" className="w-full">
                                Criar Voo
                            </Button>
                        </div>
                    </CardContent>
                </form>
            </Card>
        </div>
    );
}
