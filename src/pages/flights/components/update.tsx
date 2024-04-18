import { useState, FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FormField from "../../../components/form-field/form-field";
import { FlightFormState } from "@/interfaces/flight-interfaces/FlightFormState";
import { getFlight, updateFlight } from "@/services/flights-service/flightsService";
import { toast } from "@/components/ui/use-toast";

const fieldLabels: { [K in keyof Omit<FlightFormState, 'isValid'>]: string } = {
    departureAirport: "Aeroporto de Partida",
    departureDate: "Data de Partida",
    departureTime: "Horário de Partida",
    arrivalAirport: "Aeroporto de Chegada",
    arrivalDate: "Data de Chegada",
    arrivalTime: "Horário de Chegada",
};

export function UpdateFlightForm({ flightId, onClose }: { flightId: string; onClose: () => void }) {
    const [state, setState] = useState<FlightFormState>({
        departureAirport: "",
        departureDate: "",
        departureTime: "",
        arrivalAirport: "",
        arrivalDate: "",
        arrivalTime: "",
        isValid: true,
    });

    useEffect(() => {
        const fetchFlight = async () => {
            try {
                if (!flightId) {
                    throw new Error("ID do voo não especificado.");
                }
                const response = await getFlight(flightId);
                const flightData = response.data;
                setState({
                    departureAirport: flightData.departureAirport,
                    departureDate: flightData.departureDate.split('T')[0],
                    departureTime: flightData.departureDate.split('T')[1].split(':')[0] + ':' + flightData.departureDate.split('T')[1].split(':')[1],
                    arrivalAirport: flightData.arrivalAirport,
                    arrivalDate: flightData.arrivalDate.split('T')[0],
                    arrivalTime: flightData.arrivalDate.split('T')[1].split(':')[0] + ':' + flightData.arrivalDate.split('T')[1].split(':')[1],
                    isValid: true,
                });
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Falha ao buscar os detalhes do voo!",
                    description: "Entre novamente para editar o voo.",
                });
            }
        };

        fetchFlight();
    }, [flightId]);

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

        if (state.isValid && flightId) {
            const departureDateTime = `${state.departureDate}T${state.departureTime}:00`;
            const arrivalDateTime = `${state.arrivalDate}T${state.arrivalTime}:00`;

            const flightData = {
                departureDate: departureDateTime,
                arrivalDate: arrivalDateTime,
                departureAirport: state.departureAirport,
                arrivalAirport: state.arrivalAirport,
            };

            await updateFlight(flightId, flightData)
                .then(() => {
                    toast({
                        variant: "success",
                        title: "Voo editado com sucesso!",
                    })
                    onClose()
                })
                .catch(() => {
                    toast({
                        variant: "destructive",
                        title: "Erro ao editar voo!",
                    })
                    setState({ ...state, isValid: false });
                });
        }
    };


    return (
        <form onSubmit={handleSubmit}>
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
                                value={state[field] || ""}
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
                    Salvar
                </Button>
            </div>
        </form>
    );
}