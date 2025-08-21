<?php

namespace App\Http\Controllers\Admin;

use App\Actions\Admin\Levels\LevelDestroyAction;
use App\Actions\Admin\Levels\LevelFindAllAction;
use App\Actions\Admin\Levels\LevelStoreAction;
use App\Dtos\Admin\Levels\LevelDestroyDTO;
use App\Dtos\Admin\Levels\LevelStoreDTO;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\Levels\LevelStoreRequest;
use Illuminate\Http\Request;

class AdminLevelController extends Controller
{
    public function index(LevelFindAllAction $action)
    {

        return inertia('admin/levels/Level', [
            'levels' => $action->handle()
        ]);
    }

    public function store(LevelStoreRequest $request, LevelStoreAction $action)
    {
          $action->handle($request->toDTO());
    }

    public function destroy(Request $request, LevelDestroyAction $action)
    {
        $action->handle(LevelDestroyDTO::fromRequest($request));
    }
}
