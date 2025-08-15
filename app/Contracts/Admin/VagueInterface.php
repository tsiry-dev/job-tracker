<?php

namespace App\Contracts\Admin;

use App\Dtos\Admin\Vagues\VagueCreateDTO;
use App\Models\Vague;
use Illuminate\Pagination\LengthAwarePaginator;

interface VagueInterface
{
    public function findAll(): array;
    public function find(string $id): void;
    public function create(VagueCreateDTO $data): Vague;
    public function delete(array $ids): void;
    public function update(): void;
}
