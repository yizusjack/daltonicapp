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
    
    case Protanopia = 'Protanopia';
    case Deuteranopia = 'Deuteranopia';
    case Tritanopia = 'Tritanopia';
}
