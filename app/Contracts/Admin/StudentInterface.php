<?php

namespace App\Contracts\Admin;

use App\Dtos\Admin\Students\StudentUpdateDTO;
use App\Models\Student;

interface StudentInterface
{
    public function toggleStatus(int $id): void;
    public function getStudent(string $slug): Student;
    public function update(int $id, StudentUpdateDTO $data): void;
    public function delete(int $id): void;
}
