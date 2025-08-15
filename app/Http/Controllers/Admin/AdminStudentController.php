<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Admin\Students\StudentFindAction;
use App\Actions\Admin\Students\StudentRemoveAction;
use App\Actions\Admin\Students\StudentToggleAction;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminStudentController extends Controller
{
    public function toggle(int $id, StudentToggleAction $action): void
    {
        $action->handle($id);
    }

    public function show(string $slug, StudentFindAction $action)
    {
        $student = $action->handle($slug);
        return inertia('admin/students/StudentShow', [
            'student' => $student
        ]);
    }

    public function destroy(int $id, StudentRemoveAction $action): void
    {
         $action->handle($id);
    }
}
