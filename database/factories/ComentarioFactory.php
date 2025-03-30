<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Publicacion;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Comentario>
 */
class ComentarioFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'comentario' => $this->faker->sentence(5),
            'comentable_type' => 'App\Models\Publicacion',
            'comentable_id' => Publicacion::inRandomOrder()->take(1)->first()->id,
            'user_id' => User::inRandomOrder()->take(1)->first()->id,
        ];
    }
}
