<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AdminModuleController extends Controller
{
    public function index()
    {
        return inertia('admin/modules/Modules');
    }
}
