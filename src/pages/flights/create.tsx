import { FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateFlightFormState } from "@/interfaces/CreateFlightFormState";
import { createFlight } from "@/services/api";
import { DatePickerDemo } from "@/components/ui/date-picker";
import { format } from "date-fns";

const fieldLabels: { [K in keyof Omit<CreateFlightFormState, 'isValid'>]: string } = {
    flightNumber: "Número do Voo",
    departureAirport: "Aeroporto de Partida",
    departureDate: "Data de Partida",
    departureTime: "Hora de Partida",
    arrivalAirport: "Aeroporto de Chegada",
    arrivalDate: "Data de Chegada",
    arrivalTime: "Hora de Chegada",
};

export function CreateFlightForm() {
    const [state, setState] = useState<CreateFlightFormState>({
        flightNumber: "",
        departureDate: "",
        departureTime: "",
        arrivalDate: "",
        arrivalTime: "",
        departureAirport: "",
        arrivalAirport: "",
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
            <Card className="w-full max-w-lg">
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
                                    {field === 'departureDate' || field === 'arrivalDate' ? (
                                        <DatePickerDemo
                                            selected={state[field] ? new Date(state[field]) : undefined}
                                            onSelect={(date) => handleChange(field, format(date, "yyyy-MM-dd"))}
                                        />
                                    ) : (
                                        <Input
                                            id={field}
                                            type="text"
                                            state={state.isValid ? "default" : "error"}
                                            onFocus={() => setState({ ...state, isValid: true })}
                                            required
                                            value={state[field]}
                                            onChange={(e) => handleChange(field, e.target.value)}
                                        />
                                    )}
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
