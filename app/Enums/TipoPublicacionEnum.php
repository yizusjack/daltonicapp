<?php

namespace App\Enums;

use App\Traits\EnumToArray;


/**
 * Enumerado para mostrar los tipos de publicaciones
 *
 * @enum
 */
enum TipoPublicacionEnum: string
{
    use EnumToArray;

    case Foro = 'Foro';
    case Duda = 'Duda';
}
