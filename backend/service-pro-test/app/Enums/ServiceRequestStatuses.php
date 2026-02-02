<?php

namespace App\Enums;

enum ServiceRequestStatuses: string
{
    case OPEN = 'Open';
    case IN_PROGRESS = 'on_progress';
    case RESOLVED = 'resolved';
}
