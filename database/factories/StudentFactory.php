<?php

namespace Database\Factories;

use App\Models\Vague;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $vagues = Vague::all();

        return [
            'vague_id' => $vagues->random()->id,
            'name' => fake()->name(),
            'slug' => fake()->slug(),
            'phone' => fake()->phoneNumber(),
        ];
    }
}
