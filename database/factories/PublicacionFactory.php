<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Publicacion;
use App\Enums\TipoPublicacionEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Publicacion>
 */
class PublicacionFactory extends Factory
{
    protected $model = Publicacion::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'titulo' => $this->faker->sentence(3),
            'contenido' => $this->faker->sentence(5),
            'user_id' => User::inRandomOrder()->take(1)->first()->id,
            'tipo' => $this->faker->randomElement(TipoPublicacionEnum::class)->value,
        ];
    }
}
