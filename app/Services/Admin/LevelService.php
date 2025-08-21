<?php

namespace App\Services\Admin;

use App\Dtos\Admin\Levels\LevelStoreDTO;
use App\Models\Level;
use App\Repositories\Admin\LevelRepository;

class LevelService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        private LevelRepository $repository
    ){}

    public function store(LevelStoreDTO $data): Level
    {
        return $this->repository->store($data);
    }
}
