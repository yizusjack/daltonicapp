<?php

namespace Database\Factories;

use App\Models\User;
use App\Models\Publicacion;
use App\Enums\TipoReporteEnum;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reporte>
 */
class ReporteFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::inRandomOrder()->take(1)->first()->id,
            'tipo' => $this->faker->randomElement(TipoReporteEnum::class)->name,
            'explicacion' => $this->faker->sentence(2),
            'reportable_type' => 'App\Models\Publicacion',
            'reportable_id' => Publicacion::inRandomOrder()->take(1)->first()->id,
        ];
    }
}
