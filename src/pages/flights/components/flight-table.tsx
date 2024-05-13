import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { FlightTableProps } from '@/interfaces/flight-interfaces/FlightTableProps';
import { Pencil, Trash2 } from 'lucide-react';

const FlightTable: React.FC<FlightTableProps> = ({ flights, onDelete, onEdit }) => {
    return (
        <Table className="rounded-lg overflow-hidden min-w-screen-md shadow-lg">
            <TableHeader className="bg-gray-100">
                <TableRow>
                    <TableHead className="w-[100px] px-4 py-2">ID</TableHead>
                    <TableHead className="w-[100px] px-4 py-2">Tag</TableHead>
                    <TableHead className="px-4 py-2">Data de Saída</TableHead>
                    <TableHead className="px-4 py-2">Data de Chegada</TableHead>
                    <TableHead className="px-4 py-2">Aeroporto de Saída</TableHead>
                    <TableHead className="px-4 py-2">Aeroporto de Chegada</TableHead>
                    <TableHead className="px-4 py-2">Status</TableHead>
                    <TableHead className="px-4 py-2">Modelo do Avião</TableHead>
                    <TableHead className="px-4 py-2">Opções</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {flights.map((flight) => (
                    <TableRow key={flight.id} className="hover:bg-gray-100">
                        <TableCell className="font-medium px-4 py-2">{flight.id}</TableCell>
                        <TableCell className="font-medium px-4 py-2">{flight.tag}</TableCell>
                        <TableCell className="px-4 py-2">{format(parseISO(flight.departureDate), 'dd/MM/yyyy HH:mm', { locale: ptBR })}</TableCell>
                        <TableCell className="px-4 py-2">{format(parseISO(flight.arrivalDate), 'dd/MM/yyyy HH:mm', { locale: ptBR })}</TableCell>
                        <TableCell className="px-4 py-2">{flight.departureAirport}</TableCell>
                        <TableCell className="px-4 py-2">{flight.arrivalAirport}</TableCell>
                        <TableCell className="px-4 py-2">{flight.status}</TableCell>
                        <TableCell className="px-4 py-2">{flight.airplaneModel}</TableCell>
                        <TableCell className="px-4 py-2 flex space-x-2">
                            <Link to={`/flights/${flight.id}`}>
                                <Button>
                                    Bagagens
                                </Button>
                            </Link>
                            <Button onClick={() => onEdit(flight.id)}>
                                <Pencil size={22} />
                            </Button>
                            <div>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button className="bg-red-700 hover:bg-red-600">
                                            <Trash2 />
                                        </Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                                        <AlertDialogDescription>Tem certeza de que deseja excluir este voo?</AlertDialogDescription>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => onDelete(flight.id)}>Confirmar</AlertDialogAction>
                                        </AlertDialogFooter>
                                    </AlertDialogContent>
                                </AlertDialog>
                            </div>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default FlightTable;
