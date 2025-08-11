<?php

namespace Database\Seeders;

use App\Models\Langage;
use App\Models\Level;
use App\Models\Module;
use App\Models\Observation;
use App\Models\Student;
use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\Vague;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        User::factory()->create([
            'name' => 'tsiry',
            'email' => 'tsiri@gmail.com',
            'password' => bcrypt('0718'),
        ]);

        DB::table('levels')->insert(Level::LEVEL_LISTS);
        DB::table('langages')->insert(Langage::LANGAGE_LISTS);
        DB::table('modules')->insert(Module::MODULE_LISTS);

        Vague::factory(10)->create();
        Student::factory(30)->create();
        Observation::factory(30)->create();

        $modules = Module::all();
        $vagues = Vague::all();

        foreach ($vagues as $vague) {
            foreach ($modules as $module) {

                DB::table('module_vagues')->insert(
                    [
                        'vague_id' => $vague->id,
                        'module_id' => $module->id,
                        'created_at' => now(),
                        'updated_at' => now(),
                    ]
                );
            }
        }


    }
}
