<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Admin\Dashboard\StudentFindAllAction;
use App\Actions\Admin\Dashboard\VagueFindAllAction;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    public function index(
        VagueFindAllAction $vagueActionction,
        StudentFindAllAction $studentActionaction
    )
    {

        $vagues = $vagueActionction->handle();
        $students = $studentActionaction->handle();

        return inertia('admin/Dashboard', [
            'vagues' => $vagues,
            'students' => $students,
        ]);
    }
}
