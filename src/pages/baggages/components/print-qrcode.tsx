import { PrintQRCodeProps } from "@/interfaces/baggage-interfaces/QrCodeProps";
import React, { ForwardedRef } from "react";

export const PrintQRCode = React.forwardRef<HTMLDivElement, PrintQRCodeProps>(({ src }, ref: ForwardedRef<HTMLDivElement>) => (
    <div ref={ref} className="flex justify-center items-center min-h-[300px]">
        <img src={src} alt="QR Code" className="w-8/12"/>
    </div>
));