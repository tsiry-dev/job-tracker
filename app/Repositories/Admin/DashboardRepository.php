<?php

namespace App\Repositories\Admin;

use App\Models\Student;
use App\Models\Vague;
use Illuminate\Database\Eloquent\Collection;

class DashboardRepository
{
   public function students(): Collection
   {
      return Student::all();
   }

   public function vagues(): Collection
   {
       return Vague::with(['students'])->get();
   }
}
