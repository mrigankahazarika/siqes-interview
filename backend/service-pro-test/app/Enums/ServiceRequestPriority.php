<?php

namespace App\Enums;

enum ServiceRequestPriority: string
{
    case LOW = 'Low';
    case MEDIUM = 'Medium';
    case HIGH = 'High';


     public static function options(): array {
        return array_map(fn($case) => [
            'value' => $case->value,
            'label' => $case->name
        ], self::cases());
    }
}
