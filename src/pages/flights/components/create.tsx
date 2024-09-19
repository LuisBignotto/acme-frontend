import { useState, FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FormField from "../../../components/form-field/form-field";
import SelectHour from "./select-hour";
import SelectMinute from "./select-minute";
import { FlightFormState } from "@/interfaces/flight-interfaces/FlightFormState";
import { createFlight } from "@/services/flights-service/flightsService";
import { toast } from "@/components/ui/use-toast";

const fieldLabels: { [K in keyof Omit<FlightFormState, 'isValid'>]: string } = {
    tag: "Tag do Voo",
    departureAirport: "Aeroporto de Partida",
    departureDate: "Data de Partida",
    departureTime: "Horário de Partida",
    arrivalAirport: "Aeroporto de Chegada",
    arrivalDate: "Data de Chegada",
    arrivalTime: "Horário de Chegada",
    status: "Status do Voo",
    airplaneModel: "Modelo do Avião",
};

export function CreateFlightForm({ onClose }: { onClose: () => void }) {
    const [state, setState] = useState<FlightFormState>({
        tag: "",
        departureAirport: "",
        departureDate: "",
        departureTime: "",
        arrivalAirport: "",
        arrivalDate: "",
        arrivalTime: "",
        status: "",
        airplaneModel: "",
        isValid: true,
    });

    const handleChange = (field: keyof FlightFormState, value: string) => {
        setState({ ...state, [field]: value });
    };

    const handleTimeChange = (field: keyof FlightFormState, timePart: "hour" | "minute", value: string) => {
        const currentTime = state[field] as string || "00:00";
        const [hour, minute] = currentTime.split(":");
        const newTime = timePart === "hour" ? `${value}:${minute}` : `${hour}:${value}`;
        handleChange(field, newTime);
    };

    const generateFlightTag = (departureAirport: string, arrivalAirport: string): string => {
        const randomNumbers = Math.floor(100 + Math.random() * 900).toString();
        const departureCode = departureAirport.slice(0, 3).toUpperCase();
        const arrivalCode = arrivalAirport.slice(0, 3).toUpperCase();
        return `${departureCode}${randomNumbers}${arrivalCode}`;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (state.isValid) {
            const departureDateTime = `${state.departureDate}T${state.departureTime}:00`;
            const arrivalDateTime = `${state.arrivalDate}T${state.arrivalTime}:00`;

            const flightTag = generateFlightTag(state.departureAirport, state.arrivalAirport);

            const flightData = {
                tag: flightTag,
                departureDate: departureDateTime,
                arrivalDate: arrivalDateTime,
                departureAirport: state.departureAirport,
                arrivalAirport: state.arrivalAirport,
                status: state.status,
                airplaneModel: state.airplaneModel,
            };

            try {
                await createFlight(flightData);
                toast({
                    variant: "success",
                    title: "Voo criado com sucesso!",
                });
                onClose();
            } catch (error) {
                toast({
                    variant: "destructive",
                    title: "Erro ao criar voo!",
                });
                setState({ ...state, isValid: false });
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="departureAirport">{fieldLabels.departureAirport}</Label>
                    <FormField
                        field="departureAirport"
                        value={state.departureAirport}
                        onChange={(value) => handleChange("departureAirport", value)}
                        type="text"
                        placeholder={fieldLabels.departureAirport}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="departureTime">{fieldLabels.departureTime}</Label>
                    <div className="flex space-x-2">
                        <SelectHour
                            value={state.departureTime.split(":")[0]}
                            onChange={(value) => handleTimeChange("departureTime", "hour", value)}
                            placeholder="Hora"
                        />
                        <SelectMinute
                            value={state.departureTime.split(":")[1]}
                            onChange={(value) => handleTimeChange("departureTime", "minute", value)}
                            placeholder="Minuto"
                        />
                    </div>
                </div>
                <div className="grid gap-2 col-span-2">
                    <Label htmlFor="departureDate">{fieldLabels.departureDate}</Label>
                    <FormField 
                        field="departureDate"
                        value={state.departureDate}
                        onChange={(value) => handleChange("departureDate", value)}
                        type="date"
                        placeholder={fieldLabels.departureDate}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="arrivalAirport">{fieldLabels.arrivalAirport}</Label>
                    <FormField
                        field="arrivalAirport"
                        value={state.arrivalAirport}
                        onChange={(value) => handleChange("arrivalAirport", value)}
                        type="text"
                        placeholder={fieldLabels.arrivalAirport}
                    />
                </div>
                <div className="grid gap-2 col-span-2">
                    <Label htmlFor="arrivalDate">{fieldLabels.arrivalDate}</Label>
                    <FormField
                        field="arrivalDate"
                        value={state.arrivalDate}
                        onChange={(value) => handleChange("arrivalDate", value)}
                        type="date"
                        placeholder={fieldLabels.arrivalDate}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="arrivalTime">{fieldLabels.arrivalTime}</Label>
                    <div className="flex space-x-2">
                        <SelectHour
                            value={state.arrivalTime.split(":")[0]}
                            onChange={(value) => handleTimeChange("arrivalTime", "hour", value)}
                            placeholder="Hora"
                        />
                        <SelectMinute
                            value={state.arrivalTime.split(":")[1]}
                            onChange={(value) => handleTimeChange("arrivalTime", "minute", value)}
                            placeholder="Minuto"
                        />
                    </div>
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="status">{fieldLabels.status}</Label>
                    <FormField
                        field="status"
                        value={state.status}
                        onChange={(value) => handleChange("status", value)}
                        type="text"
                        placeholder={fieldLabels.status}
                    />
                </div>
                <div className="grid gap-2">
                    <Label htmlFor="airplaneModel">{fieldLabels.airplaneModel}</Label>
                    <FormField
                        field="airplaneModel"
                        value={state.airplaneModel}
                        onChange={(value) => handleChange("airplaneModel", value)}
                        type="text"
                        placeholder={fieldLabels.airplaneModel}
                    />
                </div>
            </div>
            <Button type="submit" className="mt-4 w-full">Criar Voo</Button>
        </form>
    );
}
