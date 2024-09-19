export interface BaggageFormState {
    userId?: number | string;
    userEmail: string;
    tag: string;
    color: string;
    weight: string;
    status: string;
    lastSeenLocation: string;
    flightId: string;
    isValid: boolean;
}