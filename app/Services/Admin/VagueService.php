<?php

namespace App\Services\Admin;

use App\Dtos\Admin\Vagues\VagueCreateDTO;
use App\Repositories\Admin\VagueRepository;
use Illuminate\Support\Facades\DB;

class VagueService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        private VagueRepository $repository
    )
    {
        //
    }

    public function findAll(): array
    {

        $vagues = $this->repository->findAll();

        return $vagues;
    }

    public function create(VagueCreateDTO $data)
    {
       $this->repository->create($data);
    }

    public function delete(array $ids): void
    {
       DB::transaction(function () use ($ids) {
          $this->repository->delete($ids);
       });
    }
}
