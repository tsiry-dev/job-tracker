import type { Vague } from "./vague";

export type Student = {
    id: number;
    vague_id: number;
    name: string;
    slug: string;
    phone: string;
    status: boolean;
    vague: Vague
};
