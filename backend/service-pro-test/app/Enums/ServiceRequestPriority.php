<?php

namespace App\Enums;

enum ServiceRequestPriority: string
{
    case LOW = 'Low';
    case MEDIUM = 'Medium';
    case HIGH = 'High';
}
