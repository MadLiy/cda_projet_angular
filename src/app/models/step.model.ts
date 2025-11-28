import { Activity } from "./activity.model";

export interface Step {
    id: number,
    name: string,
    order: number,
    activities: Activity[]
}