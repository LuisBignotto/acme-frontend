import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { FlightTableProps } from '@/interfaces/flight-interfaces/FlightTableProps';

const FlightTable: React.FC<FlightTableProps> = ({ flights, onDelete }) => {
    return (
        <Table className="rounded-lg overflow-hidden min-w-screen-md shadow-lg">
            <TableHeader className="bg-gray-100">
                <TableRow>
                    <TableHead className="w-[100px] px-4 py-2">Tag</TableHead>
                    <TableHead className="px-4 py-2">Data de Saída</TableHead>
                    <TableHead className="px-4 py-2">Data de Chegada</TableHead>
                    <TableHead className="px-4 py-2">Aeroporto de Saida</TableHead>
                    <TableHead className="px-4 py-2">Aeroporto de Chegada</TableHead>
                    <TableHead className="px-4 py-2">Opções</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {flights.map((flight) => (
                    <TableRow key={flight.id} className="hover:bg-gray-100">
                        <TableCell className="font-medium px-4 py-2">{flight.flightNumber}</TableCell>
                        <TableCell className="px-4 py-2">{format(parseISO(flight.departureDate), 'dd/MM/yyyy HH:mm', { locale: ptBR })}</TableCell>
                        <TableCell className="px-4 py-2">{format(parseISO(flight.arrivalDate), 'dd/MM/yyyy HH:mm', { locale: ptBR })}</TableCell>
                        <TableCell className="px-4 py-2">{flight.departureAirport}</TableCell>
                        <TableCell className="px-4 py-2">{flight.arrivalAirport}</TableCell>
                        <TableCell className="px-4 py-2 flex space-x-2">
                            <Link to={`/flights/${flight.id}`}>
                                <Button>Ver Bagagens</Button>
                            </Link>
                            <Link to={`/flights/update/${flight.id}`}>
                                <Button>Editar</Button>
                            </Link>
                            <div>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button className="bg-red-700 hover:bg-red-600">Apagar</Button>
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
