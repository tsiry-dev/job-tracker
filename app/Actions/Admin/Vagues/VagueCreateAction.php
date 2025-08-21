<?php

namespace App\Actions\Admin\Vagues;

use App\Dtos\Admin\Vagues\VagueCreateDTO;
use App\Services\Admin\VagueService;

class VagueCreateAction
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        private VagueService $services
    )
    {
        //
    }

    public function handle(VagueCreateDTO $data)
    {
       $this->services->create($data);
    }
}
