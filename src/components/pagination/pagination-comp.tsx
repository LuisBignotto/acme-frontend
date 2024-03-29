import React from 'react';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from "@/components/ui/pagination";

interface PaginationComponentProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
}

const PaginationComponent: React.FC<PaginationComponentProps> = ({ currentPage, totalPages, onPageChange }) => {
    return (
        <Pagination className="text-black">
            <PaginationContent>
                {currentPage > 0 && (
                    <PaginationItem>
                        <PaginationPrevious href="#" onClick={(e) => { e.preventDefault(); onPageChange(currentPage - 1); }} />
                    </PaginationItem>
                )}
                {Array.from({ length: totalPages }, (_, index) => (
                    <PaginationItem key={index}>
                        <PaginationLink href="#" isActive={index === currentPage} onClick={(e) => { e.preventDefault(); onPageChange(index); }}>
                            {index + 1}
                        </PaginationLink>
                    </PaginationItem>
                ))}
                {currentPage < totalPages - 1 && (
                    <PaginationItem>
                        <PaginationNext href="#" onClick={(e) => { e.preventDefault(); onPageChange(currentPage + 1); }} />
                    </PaginationItem>
                )}
            </PaginationContent>
        </Pagination>
    );
};

export default PaginationComponent;
