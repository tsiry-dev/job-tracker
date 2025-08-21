import type{ Vague } from "./vague";
import type { Module } from "./modules";

export type Level = {
    id: number;
    name: string;
    slug: string;
    wave_count: number;
    created_at: string;
    updated_at: string;
    vagues: Vague[];
    modules: Module[];
};
