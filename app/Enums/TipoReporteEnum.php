<?php

namespace App\Enums;

use App\Traits\EnumToArray;


/**
 * Enumerado para mostrar los tipos de publicaciones
 *
 * @enum
 */
enum TipoReporteEnum: string
{
    use EnumToArray;

    case Inapropiado = 'El contenido es inapropiado';
    case Ofensivo = 'El contenido es ofensivo para mi o alguien más';
    case Engañoso = 'El contenido es publicidad engañosa';
    case NoRelacion = 'El contenido  no tiene relación con el foro';
    case Catfish = 'Quien creó este contenido está fingiendo ser alguien que no es';
}
