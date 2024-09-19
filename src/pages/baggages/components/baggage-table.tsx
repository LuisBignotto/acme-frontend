import React, { useRef } from 'react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { BaggageTableProps } from '@/interfaces/baggage-interfaces/BaggageTableProps';
import { Pencil, Trash2, QrCode } from 'lucide-react';
import { getQrCode } from '@/services/baggage-service/baggageService';
import { Baggages } from '@/interfaces/baggage-interfaces/Baggages';

const BaggageTable: React.FC<BaggageTableProps> = ({ baggages, onDelete, onEdit }) => {
    const printRef = useRef<HTMLIFrameElement>(null);

    const handleQrCodeClick = async (baggage: Baggages) => {
        try {
            const params = {
                id: baggage.id,
                userId: baggage.userId,
                tag: baggage.tag,
                color: baggage.color,
                weight: baggage.weight,
                flightId: baggage.flightId,
            };
            const pdfBlob = await getQrCode(params);
            const pdfUrl = URL.createObjectURL(pdfBlob);

            printRef.current!.src = pdfUrl;
            printRef.current!.onload = () => {
                printRef.current!.contentWindow!.print();
            };
        } catch (error) {
            console.error('Failed to load QR Code:', error);
        }
    };

    return (
        <>
            <Table className="rounded-lg overflow-hidden min-w-screen-md shadow-lg min-w-6xl">
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
                    {baggages.map((baggage) => (
                        <TableRow key={baggage.id} className="hover:bg-gray-100">
                            <TableCell className="font-medium px-4 py-2">{baggage.id}</TableCell>
                            <TableCell className="px-4 py-2">{baggage.userId}</TableCell>
                            <TableCell className="px-4 py-2">{baggage.tag}</TableCell>
                            <TableCell className="px-4 py-2">{baggage.color}</TableCell>
                            <TableCell className="px-4 py-2">{baggage.weight}kg</TableCell>
                            <TableCell className="px-4 py-2">{baggage.status.status}</TableCell>
                            <TableCell className="px-4 py-2">{baggage.lastLocation}</TableCell>
                            <TableCell className="px-4 py-2 flex space-x-2">
                                {onEdit && (
                                    <Button onClick={() => onEdit(baggage)}>
                                        <Pencil size={22} />
                                    </Button>
                                )}
                                <div className='flex space-x-1'>
                                    <Button onClick={() => handleQrCodeClick(baggage)}>
                                        <QrCode />
                                    </Button>
                                    <AlertDialog>
                                        <AlertDialogTrigger asChild>
                                            <Button className="bg-red-700 hover:bg-red-600">
                                                <Trash2 />
                                            </Button>
                                        </AlertDialogTrigger>
                                        <AlertDialogContent>
                                            <AlertDialogTitle>Confirmar Exclusão</AlertDialogTitle>
                                            <AlertDialogDescription>Tem certeza de que deseja excluir esta bagagem?</AlertDialogDescription>
                                            <AlertDialogFooter>
                                                <AlertDialogCancel>Cancelar</AlertDialogCancel>
                                                <AlertDialogAction onClick={() => onDelete(baggage.id)}>Confirmar</AlertDialogAction>
                                            </AlertDialogFooter>
                                        </AlertDialogContent>
                                    </AlertDialog>
                                </div>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <iframe
                ref={printRef}
                style={{ display: 'none' }}
                title="QR Code"
            />
        </>
    );
};

export default BaggageTable;
