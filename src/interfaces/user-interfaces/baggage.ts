export interface Baggage {
    id: number;
    userId: number;
    tag: string;
    color: string;
    weight: number;
    status: {
        id: number;
        status: string;
    };
    lastLocation: string;
    flightId: number;
    trackers: any[];
}
