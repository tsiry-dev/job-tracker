<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Admin\Vagues\VagueCreateAction;
use App\Actions\Admin\Vagues\VagueDeleteAction;
use App\Actions\Admin\Vagues\VagueGetAllAction;
use App\Dtos\Admin\Vagues\VagueCreateDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Vagues\VagueCreateRequest;
use App\Http\Requests\Admin\Vagues\VagueDeleteRequest;
use App\Models\Vague;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminVagueController extends Controller
{
    public function index(VagueGetAllAction $action)
    {

        $vagues = $action->handle();

        return inertia('admin/vagues/Vague', [
            'vagues' => $vagues['vagues'],
            'levels' => $vagues['levels']
        ]);
    }

    public function create(VagueCreateRequest $request, VagueCreateAction $action)
    {
        // dd($request->name);
       $action->handle(VagueCreateDTO::fromArray($request->all()));
    }

    public function destroy(VagueDeleteRequest $request, VagueDeleteAction $action)
    {
        $action->handle($request->ids);

    }
}
