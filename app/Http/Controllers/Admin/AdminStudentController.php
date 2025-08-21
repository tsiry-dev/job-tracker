<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Admin\Students\StudentFindAction;
use App\Actions\Admin\Students\StudentRemoveAction;
use App\Actions\Admin\Students\StudentStoreAction;
use App\Actions\Admin\Students\StudentToggleAction;
use App\Actions\Admin\Students\StudentUpdateAction;
use App\Dtos\Admin\Students\StudentStoreDTO;
use App\Dtos\Admin\Students\StudentUpdateDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Students\StudentStoreRequest;
use App\Models\Student;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;

class AdminStudentController extends Controller
{
    public function toggle(int $id, StudentToggleAction $action): void
    {
        $action->handle($id);
    }

    public function store(StudentStoreRequest $request, StudentStoreAction $action)
    {
        $action->handle(StudentStoreDTO::fromArray($request->all()));
    }

    public function show(string $slug, StudentFindAction $action)
    {
        $student = $action->handle($slug);
        return inertia('admin/students/StudentShow', [
            'student' => $student
        ]);
    }

    public function update(Request $request, StudentUpdateAction $action) :RedirectResponse
    {
        // dd([...$request->data, 'created_at' => now()]);
        $id = $request->data['id'];
        $action->handle($id, StudentUpdateDTO::fromArray([...$request->data, 'created_at' => now()]));

        return redirect()->route('admin.vagues.index');
    }

    public function destroy(int $id, StudentRemoveAction $action): void
    {
         $action->handle($id);
    }


}
