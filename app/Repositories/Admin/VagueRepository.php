<?php

namespace App\Repositories\Admin;

use App\Contracts\Admin\VagueInterface;
use App\Dtos\Admin\Vagues\VagueCreateDTO;
use App\Models\Level;
use App\Models\Module;
use App\Models\ModuleVague;
use App\Models\Vague;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

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
        $vagues->load(['students', 'level', 'modules']);

        $levels = Level::all();

        return [
            'vagues' => $vagues,
            'levels' => $levels
        ];
    }

    public function create (VagueCreateDTO $data): Vague
    {
        return DB::transaction(function () use ($data) {
            // 1. Créer la vague
            $vague = Vague::create([
                'level_id'   => $data->level_id,
                'name'       => $data->name,
                'slug'       => Str::slug($data->name),
                'start_date' => $data->start_date,
                'end_date'   => $data->end_date,
                'status'     => true,
            ]);

            // 2. Récupérer tous les modules
            $modules = Module::all();

            foreach ($modules as $module) {
               DB::table('module_vagues')->insert([
                    'vague_id'    => $vague->id,
                    'name'        => $vague->name,
                    'description' => $vague->description,
                    'status'      => ModuleVague::PENDING
                ]);
            }

            return $vague;
        });
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
