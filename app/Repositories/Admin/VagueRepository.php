<?php

namespace App\Repositories\Admin;

use App\Contracts\Admin\VagueInterface;
use App\Dtos\Admin\Vagues\VagueCreateDTO;
use App\Models\Level;
use App\Models\Vague;
use Illuminate\Pagination\LengthAwarePaginator;

class VagueRepository implements VagueInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function findAll(): array
    {
        $vagues = Vague::orderBy('status', 'desc')
                 ->orderBy('created_at', 'desc')
                 ->paginate(7);
        $vagues->load(['students', 'level']);

        $levels = Level::all();

        return [
            'vagues' => $vagues,
            'levels' => $levels
        ];
    }

    public function create (VagueCreateDTO $data): Vague
    {
        return Vague::create([
            'level_id' => $data->level_id,
            'name' => $data->name,
            'slug' => \Illuminate\Support\Str::slug($data->name),
            'start_date' => $data->start_date,
            'end_date' => $data->end_date,
            'status' => true
        ]);
    }

    public function find(string $id): void
    {}

    public function delete(array $ids): void
    {
        // dd($ids);
        Vague::destroy($ids);
    }

    public function update(): void
    {}
}
