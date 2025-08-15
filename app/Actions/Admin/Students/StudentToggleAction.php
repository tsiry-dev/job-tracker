<?php

namespace App\Actions\Admin\Students;

use App\Services\Admin\StudentService;

class StudentToggleAction
{
    public function __construct(
        private StudentService $services
    )
    {}

    public function handle(int $id): void
    {
        $this->services->toggleStatus($id);
    }

}
