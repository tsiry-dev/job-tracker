import type { Vague, VagueWithModules } from "./vague";

export type Student = {
    id: number;
    vague_id: number;
    name: string;
    slug: string;
    phone: string;
    status: boolean;
    vague: VagueWithModules
};

export type StudentFull = Student & {
  vague: Vague;
};
