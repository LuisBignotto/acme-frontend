import { Status } from "./Status";
import { Tracker } from "./Tracker";

export interface Baggages {
    id: number;
    userId: number;
    tag: string;
    color: string;
    weight: number;
    status: Status;
    lastLocation: string;
    flightId: number;
    trackers: Tracker[];
}