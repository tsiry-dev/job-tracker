<?php

namespace App\Actions\Admin\Students;

use App\Repositories\Admin\StudentRepository;
use App\Services\Admin\StudentService;


abstract class AbstractStudentAction
{
   public function __construct(
      protected StudentService $services,
      protected StudentRepository $repository
   ){}
}
