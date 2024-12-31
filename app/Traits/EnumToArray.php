<?php

namespace App\Traits;

trait EnumToArray
{
    /**
     * Retorna el nombre de los casos del enum
     * 
     * @return array
     */
    public static function names(): array
    {
        return array_column(self::cases(), 'name');
    }

    /**
     * Retorna todos los valores de los casos del enum
     * 
     * @return array
     */
    public static function values(): array
    {
        return array_column(self::cases(), 'value');
    }
}


