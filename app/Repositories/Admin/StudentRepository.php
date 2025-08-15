<?php

namespace App\Repositories\Admin;

use App\Contracts\Admin\StudentInterface;
use App\Models\Student;

class StudentRepository implements StudentInterface
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    public function toggleStatus(int $id): void
    {
        $student = Student::find($id);
        $student->status = !$student->status;
        $student->save();
    }

    public function getStudent(string $slug): Student
    {
         return Student::with(['vague.level'])->where('slug', $slug)->first();
    }

    public function delete(int $id): void
    {
        Student::find($id)->delete();
    }
}
