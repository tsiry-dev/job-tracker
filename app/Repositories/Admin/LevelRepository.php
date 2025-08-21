<?php

namespace App\Repositories\Admin;

use App\Contracts\Admin\LevelInterface;
use App\Dtos\Admin\Levels\LevelStoreDTO;
use App\Models\Level;
use Illuminate\Database\Eloquent\Collection;

class LevelRepository implements LevelInterface
{


    public function findAll(): Collection
    {
        return Level::with(['vagues', 'modules'])->get();
    }

    public function store(LevelStoreDTO $data): Level
    {

        return Level::create([
            'name' => $data->name,
            'slug' => \Illuminate\Support\Str::slug($data->name),
            'description' => $data->description,
        ]);
    }

    public function destroy(int $id): void
    {
        Level::find($id)->delete();
    }
}
