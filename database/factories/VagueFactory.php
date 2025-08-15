<?php

namespace Database\Factories;

use App\Models\Level;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Vague>
 */
class VagueFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $Matin_midi = ['Matin', 'Midi'];

        $name = fake()->dateTimeBetween('-1 year', 'now')->format('Y-m-d H:i:s') . fake()->randomElement($Matin_midi);

        return [
            'level_id' => 1,
            'name' => $name,
            'slug' => \illuminate\Support\Str::slug($name),
            'start_date' => fake()->dateTimeBetween('-1 year', 'now'),
            'end_date' => fake()->dateTimeBetween('-1 year', 'now'),
            'status' => fake()->boolean(),
        ];
    }
}
