<?php

namespace App\Contracts\Admin;

use App\Models\Student;

interface StudentInterface
{
    public function toggleStatus(int $id): void;
    public function getStudent(string $slug): Student;
    public function delete(int $id): void;
}
