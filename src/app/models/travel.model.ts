import { Step } from "./step.model";

export interface Travel {
    id: number,
    title: string,
    destination: string,
    description?: string,
    startDate?: string,
    endDate?: string,
    imageUrl?: string,
    steps: Step[]
}