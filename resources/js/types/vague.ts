import type { Student } from "./student";

export type Vague = {
    id: number;
    level_id: number;
    name: string;
    slug: string;
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
    status: boolean; // si tu veux calculer côté front
    students: Student[]; // idem
};
