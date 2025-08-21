<?php

namespace App\Contracts\Admin;

use App\Dtos\Admin\Levels\LevelStoreDTO;
use App\Dtos\Admin\Vagues\VagueCreateDTO;
use App\Models\Level;
use App\Models\Vague;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Pagination\LengthAwarePaginator;

interface LevelInterface
{
   public function findAll(): Collection;
   public function store(LevelStoreDTO $data): Level;
   public function destroy(int $id): void;
}
