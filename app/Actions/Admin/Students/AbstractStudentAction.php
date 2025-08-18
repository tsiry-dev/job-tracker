<?php

namespace App\Actions\Admin\Students;

use App\Services\Admin\StudentService;


abstract class AbstractStudentAction
{
   public function __construct(
      protected StudentService $services
   ){}
}
