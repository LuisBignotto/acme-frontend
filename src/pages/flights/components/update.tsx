import { useState, FormEvent, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import FormField from "../../../components/form-field/form-field";
import SelectHour from "./select-hour";
import SelectMinute from "./select-minute";
import { FlightFormState } from "@/interfaces/flight-interfaces/FlightFormState";
import { getFlight, updateFlight } from "@/services/flights-service/flightsService";
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

export function UpdateFlightForm({ flightId, onClose }: { flightId: string; onClose: () => void }) {
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

    useEffect(() => {
        const fetchFlight = async () => {
            try {
                if (!flightId) {
                    throw new Error("ID do voo não especificado.");
                }
                const response = await getFlight(flightId);
                const flightData = response.data;
                setState({
                    tag: flightData.tag || "",
                    departureAirport: flightData.departureAirport,
                    departureDate: flightData.departureDate.split('T')[0],
                    departureTime: flightData.departureDate.split('T')[1].split(':')[0] + ':' + flightData.departureDate.split('T')[1].split(':')[1],
                    arrivalAirport: flightData.arrivalAirport,
                    arrivalDate: flightData.arrivalDate.split('T')[0],
                    arrivalTime: flightData.arrivalDate.split('T')[1].split(':')[0] + ':' + flightData.arrivalDate.split('T')[1].split(':')[1],
                    status: flightData.status || "",
                    airplaneModel: flightData.airplaneModel || "",
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
                tag: state.tag,
                departureDate: departureDateTime,
                arrivalDate: arrivalDateTime,
                departureAirport: state.departureAirport,
                arrivalAirport: state.arrivalAirport,
                status: state.status,
                airplaneModel: state.airplaneModel,
            };

            await updateFlight(flightId, flightData)
                .then(() => {
                    toast({
                        variant: "success",
                        title: "Voo editado com sucesso!",
                    });
                    onClose();
                })
                .catch(() => {
                    toast({
                        variant: "destructive",
                        title: "Erro ao editar voo!",
                    });
                    setState({ ...state, isValid: false });
                });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="tag">{fieldLabels.tag}</Label>
                    <FormField
                        field="tag"
                        value={state.tag}
                        onChange={(value) => handleChange("tag", value)}
                        type="text"
                        placeholder={fieldLabels.tag}
                    />
                </div>
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
            <Button type="submit" className="mt-4 w-full">Salvar</Button>
        </form>
    );
}
