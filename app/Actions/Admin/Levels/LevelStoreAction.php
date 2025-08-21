<?php

namespace App\Actions\Admin\Levels;

use App\Dtos\Admin\Levels\LevelStoreDTO;
use App\Models\Level;
use App\Services\Admin\LevelService;

class LevelStoreAction
{

    public function __construct(
        private LevelService $services
    )
    {}

    public function handle(LevelStoreDTO $data): Level
    {
        return $this->services->store($data);
    }
}
