<?php

namespace App\Actions\Admin\Students;

use App\Models\Student;
use App\Services\Admin\StudentService;

class StudentRemoveAction
{
    public function __construct(
        private StudentService $services
    )
    {}

    public function handle(int $id): void
    {
        $this->services->delete($id);
    }
}
