<?php

namespace App\Services\Admin;

use App\Models\Student;
use App\Repositories\Admin\StudentRepository;
use Illuminate\Http\RedirectResponse;

class StudentService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        private StudentRepository $repository
    )
    {
        //
    }

    public function toggleStatus(int $id): void
    {
        $this->repository->toggleStatus($id);
    }

    public function getStudent(string $slug): Student | RedirectResponse
    {
        if(!$this->repository->getStudent($slug)) {
            return to_route('admin.vagues.index');
        }

        return $this->repository->getStudent($slug);
    }

    public function delete(int $id): void
    {
        $this->repository->delete($id);
    }
}
