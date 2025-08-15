<?php

namespace App\Actions\Admin\Vagues;

use App\Services\Admin\VagueService;

abstract class AbstractVagueAction
{
   public function __construct(
      protected VagueService $services
   ){}
}
