<?php

namespace App\Repositories\Admin;

use App\Contracts\Admin\StudentInterface;
use App\Dtos\Admin\Students\{
    StudentStoreDTO,
    StudentUpdateDTO
};
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

    public function store(StudentStoreDTO $data): Student
    {
        return Student::create([
           'vague_id' => $data->vague_id,
           'name' => $data->name,
           'slug' => \Illuminate\Support\Str::slug($data->name),
           'phone' => $data->phone,
           'status' => true
        ]);
    }

    public function toggleStatus(int $id): void
    {
        $student = Student::find($id);
        $student->status = !$student->status;
        $student->save();
    }

    public function getStudent(string $slug): Student
    {
         return Student::with(['vague.level', 'vague.modules', 'vague.students'])->where('slug', $slug)->first();
    }

    public function update(int $id,StudentUpdateDTO $data): void
    {
        // dd($data);

        Student::where('id', $id)->update(  [
            'vague_id' => $data->vague_id,
            'slug' => \Illuminate\Support\Str::slug($data->name),
            'name' => $data->name,
            'phone' => $data->phone,
            'status' => $data->status,
            'created_at' => $data->created_at,
        ]);
    }

    public function delete(int $id): void
    {
        Student::find($id)->delete();
    }
}
