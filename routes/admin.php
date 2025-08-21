<?php

use App\Http\Controllers\Admin\{
    DashboardController,
    AdminLevelController,
    AdminStudentController,
    AdminVagueController
};

use App\Http\Controllers\Admin\AdminModuleController;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth', 'admin'])
     ->prefix('admin')
     ->as('admin.')
     ->group(function () {


    Route::get('/dashboard', [DashboardController::class, 'index'])
        ->name('dashboard');

    Route::controller(AdminVagueController::class)->group(function() {

        Route::get('/vagues', 'index')
            ->name('vagues.index');

        Route::delete('/vagues','destroy')
            ->name('vagues.destroy');

        Route::post('/vagues', 'create')
            ->name('vagues.create');
    });


    Route::controller(AdminStudentController::class)->group(function() {

        Route::post('/student/toggle/{id}', 'toggle')
            ->name('student.toggle');

        Route::get('/student/{slug}', 'show')
            ->name('student.show');

        Route::post('/student', 'store')
            ->name('student.store');

        Route::put('/student/update', 'update')
            ->name('student.update');

        Route::delete('/student/{id}', 'destroy')
            ->name('student.destroy');

    });


    Route::controller(AdminLevelController::class)->group(function() {

        Route::get('/levels', 'index')
            ->name('levels.index');

        Route::post('/levels', 'store')
            ->name('levels.store');

        Route::delete('/levels', 'destroy')
            ->name('levels.destroy');

    });

    Route::controller(AdminModuleController::class)->group(function() {


        Route::get('/modules', 'index')
              ->name('modules.index');

    });


});
