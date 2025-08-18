<?php

namespace App\Actions\Admin\Students;

use App\Dtos\Admin\Students\StudentUpdateDTO;

class StudentUpdateAction extends AbstractStudentAction
{
    public function handle(int $id, StudentUpdateDTO $data): void
    {
        $this->services->update($id, $data);
    }
}
