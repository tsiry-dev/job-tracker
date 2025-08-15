<?php

namespace App\Actions\Admin\Students;

use App\Models\Student;
use App\Services\Admin\StudentService;

class StudentFindAction
{
    public function __construct(
        private StudentService $services
    )
    {}

    public function handle(string $slug): Student
    {
        return $this->services->getStudent($slug);
    }
}
