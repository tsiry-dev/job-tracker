<?php

namespace App\Actions\Admin\Vagues;

class VagueDeleteAction extends AbstractVagueAction
{
   public function handle(array $ids): void
   {
       $this->services->delete($ids);
   }
}
