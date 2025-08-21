<?php

namespace App\Actions\Admin\Levels;

use App\Dtos\Admin\Levels\LevelDestroyDTO;
use App\Repositories\Admin\LevelRepository;

class LevelDestroyAction
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        private LevelRepository $repository
    ){}

    public function handle(LevelDestroyDTO $data): void
    {
       $this->repository->destroy($data->id);
    }
}
