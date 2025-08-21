<?php

namespace App\Actions\Admin\Dashboard;

use App\Repositories\Admin\DashboardRepository;
use Illuminate\Database\Eloquent\Collection;

class VagueFindAllAction
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        private DashboardRepository $repository
    ){}

    public function handle(): Collection
    {
        return $this->repository->vagues();
    }
}
