import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import FormField from "../../components/form-field/form-field";
import { FlightFormState } from "@/interfaces/flight-interfaces/FlightFormState";
import { createFlight } from "@/services/flights-service/flightsService";
import { toast } from "@/components/ui/use-toast";
import { useNavigate } from 'react-router-dom';

const fieldLabels: { [K in keyof Omit<FlightFormState, 'isValid'>]: string } = {
    departureAirport: "Aeroporto de Partida",
    departureDate: "Data de Partida",
    departureTime: "Horário de Partida",
    arrivalAirport: "Aeroporto de Chegada",
    arrivalDate: "Data de Chegada",
    arrivalTime: "Horário de Chegada",
};

export function CreateFlightForm() {

    const [state, setState] = useState<FlightFormState>({
        departureAirport: "",
        departureDate: "",
        departureTime: "",
        arrivalAirport: "",
        arrivalDate: "",
        arrivalTime: "",
        isValid: true,
    });

    const navigate = useNavigate();

    const handleChange = (field: keyof FlightFormState, value: string) => {
        setState({ ...state, [field]: value });
    };

    const handleTimeChange = (field: keyof FlightFormState, timePart: "hour" | "minute", value: string) => {
        let currentTime = state[field] || "00:00";
        currentTime = currentTime as string;
        const [hour, minute] = currentTime.split(":");
        const newTime = timePart === "hour" ? `${value}:${minute}` : `${hour}:${value}`;
        handleChange(field, newTime);
    };


    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (state.isValid) {
            const departureDateTime = `${state.departureDate}T${state.departureTime}:00`;
            const arrivalDateTime = `${state.arrivalDate}T${state.arrivalTime}:00`;

            const departureAirportCode = state.departureAirport.substring(0, 3).toUpperCase();
            const arrivalAirportCode = state.arrivalAirport.substring(0, 3).toUpperCase();
            const randomNumber = Math.floor(Math.random() * 1000);
            const flightNumber = `${departureAirportCode}${randomNumber}${arrivalAirportCode}`;

            const flightData = {
                flightNumber: flightNumber,
                departureDate: departureDateTime,
                arrivalDate: arrivalDateTime,
                departureAirport: state.departureAirport,
                arrivalAirport: state.arrivalAirport,
            };

            await createFlight(flightData)
                .then(() => {
                    toast({
                        variant: "success",
                        title: "Voo criado com sucesso!",
                    })
                    navigate('/flights');
                })
                .catch(() => {
                    toast({
                        variant: "destructive",
                        title: "Erro ao criar voo!",
                    })
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
                            {(Object.keys(fieldLabels) as (keyof Omit<FlightFormState, 'isValid'>)[]).map((field) => (
                                <div key={field} className="grid gap-2">
                                    <Label htmlFor={field}>{fieldLabels[field]}</Label>
                                    {field.includes("Time") ? (
                                        <div className="flex space-x-2">
                                            <FormField
                                                field={`${field}Hour`}
                                                value={state[field]?.split(":")[0] || ""}
                                                onChange={(value) => handleTimeChange(field, "hour", value)}
                                                type="hour"
                                                placeholder={field.includes("departure") ? "Selecione a hora de partida" : "Selecione a hora de chegada"}
                                                placeholderHour={field.includes("departure") ? "Selecione a hora de partida" : "Selecione a hora de chegada"}
                                                placeholderMinute={field.includes("departure") ? "Selecione o minuto de partida" : "Selecione o minuto de chegada"}
                                            />
                                            <FormField
                                                field={`${field}Minute`}
                                                value={state[field]?.split(":")[1] || ""}
                                                onChange={(value) => handleTimeChange(field, "minute", value)}
                                                type="minute"
                                                placeholder={field.includes("departure") ? "Selecione a hora de partida" : "Selecione a hora de chegada"}
                                                placeholderHour={field.includes("departure") ? "Selecione a hora de partida" : "Selecione a hora de chegada"}
                                                placeholderMinute={field.includes("departure") ? "Selecione o minuto de partida" : "Selecione o minuto de chegada"}
                                            />
                                        </div>
                                    ) : (
                                        <FormField
                                            field={field}
                                            value={state[field]}
                                            onChange={(value) => handleChange(field, value)}
                                            type={field === 'departureDate' || field === 'arrivalDate' ? 'date' : 'text'}
                                            placeholder={fieldLabels[field]}
                                            placeholderHour={""}
                                            placeholderMinute={""}
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
