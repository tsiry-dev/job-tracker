<?php

namespace App\Actions\Admin\Vagues;


class VagueGetAllAction extends AbstractVagueAction
{

    public function handle(): array
    {
        return $this->services->findAll();
    }
}
