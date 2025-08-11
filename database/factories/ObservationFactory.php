<?php

namespace Database\Factories;

use App\Models\Observation;
use App\Models\Student;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Observation>
 */
class ObservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $students = Student::all();

        return [
            'student_id' => Student::factory()->create()->id,
            'module_id' => 1,
            'description' => fake()->sentence(),
            'status' => fake()->randomElement([Observation::STATUS_ADMIN, Observation::STATUS_RECALE]),
        ];
    }
}
