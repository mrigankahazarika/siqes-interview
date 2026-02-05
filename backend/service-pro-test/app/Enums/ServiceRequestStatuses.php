<?php

namespace App\Enums;

enum ServiceRequestStatuses: string
{
    case OPEN = 'Open';
    case IN_PROGRESS = 'on_progress';
    case RESOLVED = 'resolved';

      public static function options(): array {
        return array_map(fn($case) => [
            'value' => $case->value,
            'label' => $case->name
        ], self::cases());
    }
}
