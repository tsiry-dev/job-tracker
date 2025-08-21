<?php

namespace App\Actions\Admin\Levels;

use App\Dtos\Admin\Levels\LevelStoreDTO;
use App\Models\Level;
use App\Repositories\Admin\LevelRepository;
use App\Services\Admin\LevelService;
use Illuminate\Database\Eloquent\Collection;

class LevelFindAllAction
{

    public function __construct(
        private LevelService $services,
        private LevelRepository $repository
    )
    {}

    public function handle(): Collection
    {
        return $this->repository->findAll();
    }
}
