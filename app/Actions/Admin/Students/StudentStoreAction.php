<?php

namespace App\Actions\Admin\Students;

use App\Dtos\Admin\Students\StudentStoreDTO;
use App\Models\Student;

class StudentStoreAction extends AbstractStudentAction
{
   public function handle(StudentStoreDTO $data): Student
   {
       return $this->repository->store($data);
   }
}
