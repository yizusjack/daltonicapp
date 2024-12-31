<?php

namespace App\Enums;

use App\Traits\EnumToArray;


/**
 * Enumerado para mostrar los tipos de archivos validos.
 *
 * @enum
 */
enum TipoArchivoEnum: string
{
    use EnumToArray;
    
    case Ishihara = 'Imagen Ishihara';
}
