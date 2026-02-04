<?php

namespace App\Enums;

enum ServiceRequestCategory: string
{
    case IT = 'IT';
    case HR = 'HR';
    case FINANCE = 'Finance';
    case OTHER = 'others';


    public static function options(): array {
        return array_map(fn($case) => [
            'value' => $case->value,
            'label' => $case->name
        ], self::cases());
    }


}
