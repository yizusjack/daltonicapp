<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Imagen;
use App\Enums\TipoArchivoEnum;

class ImagenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $images = [
            ['file' => 'ishihara_1.png', 'answers' => [12, 13, 15]],
            ['file' => 'ishihara_2.png', 'answers' => [3, 5, 8]],
            ['file' => 'ishihara_3.png', 'answers' => [5, 6, 4]],
            ['file' => 'ishihara_4.png', 'answers' => [29, 70, 57]],
            ['file' => 'ishihara_5.png', 'answers' => [28, 35, 57]],
            ['file' => 'ishihara_6.png', 'answers' => [1, 5, 2]],
            ['file' => 'ishihara_7.png', 'answers' => [3, 5, 8]],
            ['file' => 'ishihara_8.png', 'answers' => [15, 17, 78]],
            ['file' => 'ishihara_9.png', 'answers' => [33, 74, 21]],
            ['file' => 'ishihara_10.png', 'answers' => [9, 2, 0]],
            ['file' => 'ishihara_11.png', 'answers' => [0, 8, 6]],
            ['file' => 'ishihara_12.png', 'answers' => [97, 88, 79]],
            ['file' => 'ishihara_13.png', 'answers' => [73, 45, 58]],
            ['file' => 'ishihara_14.png', 'answers' => [3, 5, 8]],
            ['file' => 'ishihara_15.png', 'answers' => [7, 9, 2]],
            ['file' => 'ishihara_16.png', 'answers' => [36, 23, 16]],
            ['file' => 'ishihara_17.png', 'answers' => [73, 62, 31]],
            ['file' => 'ishihara_18.png', 'answers' => [0, 1, 5]],
            ['file' => 'ishihara_19.png', 'answers' => [2, 0, 8]],
            ['file' => 'ishihara_20.png', 'answers' => [47, 45, 42]],
            ['file' => 'ishihara_21.png', 'answers' => [73, 41, 20]],
            ['file' => 'ishihara_22.png', 'answers' => [26, 6, 2]],
            ['file' => 'ishihara_23.png', 'answers' => [4, 2, 42]],
            ['file' => 'ishihara_24.png', 'answers' => [3, 35, 5]],
            ['file' => 'ishihara_25.png', 'answers' => [6, 96, 9]],
        ];

        foreach ($images as $img) {
            $imagen = Imagen::create([
                'Respuesta_1' => $img['answers'][0],
                'Respuesta_2' => $img['answers'][1],
                'Respuesta_3' => $img['answers'][2],
            ]);

            // Path where the images are stored
            $imagePath = storage_path('app/public/ishihara/' . $img['file']);

            // Verify if the file exists before adding media
            if (file_exists($imagePath)) {
                $imagen->addMedia($imagePath)
                    ->preservingOriginal()
                    ->toMediaCollection(TipoArchivoEnum::Ishihara->value, 'public');
            } else {
                dump("Image not found: " . $imagePath);
            }
        }
    }
}
