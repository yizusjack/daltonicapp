<?php

namespace App\Enums;

use App\Traits\EnumToArray;


/**
 * Enumerado para mostrar los tipos de daltonismo existentes
 *
 * @enum
 */
enum TiposDaltonismoEnum: string
{
    use EnumToArray;
    
    case Protanopia = 'Protanopía';
    case Deuteranopia = 'Deuteranopía';
    case Tritanopia = 'Tritanopía';
}
