import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { BagageTableProps } from '@/interfaces/flight-interfaces/BagageTableProps';

const BagageTable: React.FC<BagageTableProps> = ({ bagages, onDelete }) => {
    return (
        <Table className="rounded-lg overflow-hidden min-w-screen-md shadow-lg">
            <TableHeader className="bg-gray-100">
                <TableRow>
                    <TableHead className="px-4 py-2">ID</TableHead>
                    <TableHead className="px-4 py-2">User ID</TableHead>
                    <TableHead className="px-4 py-2">Tag</TableHead>
                    <TableHead className="px-4 py-2">Cor</TableHead>
                    <TableHead className="px-4 py-2">Peso</TableHead>
                    <TableHead className="px-4 py-2">Status</TableHead>
                    <TableHead className="px-4 py-2">Última Localização</TableHead>
                    <TableHead className="px-4 py-2">Opções</TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {bagages.map((bagage) => (
                    <TableRow key={bagage.id} className="hover:bg-gray-100">
                        <TableCell className="font-medium px-4 py-2">{bagage.id}</TableCell>
                        <TableCell className="px-4 py-2">{bagage.userId}</TableCell>
                        <TableCell className="px-4 py-2">{bagage.tag}</TableCell>
                        <TableCell className="px-4 py-2">{bagage.color}</TableCell>
                        <TableCell className="px-4 py-2">{bagage.weight}kg</TableCell>
                        <TableCell className="px-4 py-2">{bagage.status}</TableCell>
                        <TableCell className="px-4 py-2">{bagage.lastSeenLocation}</TableCell>
                        <TableCell className="px-4 py-2 flex space-x-2">
                            <div>
                                <AlertDialog>
                                    <AlertDialogTrigger asChild>
                                        <Button className="bg-red-700 hover:bg-red-600">Apagar</Button>
                                    </AlertDialogTrigger>
                                    <AlertDialogContent>
                                        <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                                        <AlertDialogDescription>Tem certeza de que deseja excluir esta bagagem?</AlertDialogDescription>
                                        <AlertDialogFooter>
                                            <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                            <AlertDialogAction onClick={() => onDelete(bagage.id)}>Confirmar</AlertDialogAction>
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

export default BagageTable;
